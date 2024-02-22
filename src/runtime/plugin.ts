import destr from 'destr'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClients, provideApolloClients } from '@vue/apollo-composable'
import { ApolloClient, ApolloLink, createHttpLink, DefaultContext, InMemoryCache, split } from '@apollo/client/core'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'crypto-hash'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { setContext } from '@apollo/client/link/context'
import Pusher from 'pusher-js'
import createRestartableClient from './ws'
import { useApollo } from './composables'
import PusherLink from './pusher'
import { ref, useCookie, defineNuxtPlugin, useRequestHeaders } from '#imports'

import NuxtApollo from '#apollo'

export default defineNuxtPlugin((nuxtApp) => {
  const requestCookies = (process.server && NuxtApollo.proxyCookies && useRequestHeaders(['cookie'])) || undefined

  const clients: { [key: string]: ApolloClient<any> } = {}

  for (const [key, clientConfig] of Object.entries(NuxtApollo.clients)) {
    const getAuth = async () => {
      const token = ref<string | null>()

      await nuxtApp.callHook('apollo:auth', { token, client: key })

      if (!token.value) {
        if (clientConfig.tokenStorage === 'cookie') {
          if (process.client) {
            token.value = useCookie(clientConfig.tokenName!).value
          } else if (requestCookies?.cookie) {
            token.value = requestCookies.cookie.split(';').find(c => c.trim().startsWith(`${clientConfig.tokenName}=`))?.split('=')?.[1]
          }
        } else if (process.client && clientConfig.tokenStorage === 'localStorage') {
          token.value = localStorage.getItem(clientConfig.tokenName!)
        }

        if (!token.value) { return }
      }

      const authScheme = !!token.value?.match(/^[a-zA-Z]+\s/)?.[0]

      if (authScheme || clientConfig?.authType === null) { return token.value }

      return `${clientConfig?.authType} ${token.value}`
    }

    const authLink = setContext(async (_, { headers }) => {
      const auth = await getAuth()

      if (!auth) { return }

      return {
        headers: {
          ...headers,
          ...(requestCookies && requestCookies),
          [clientConfig.authHeader!]: auth
        }
      }
    })

    const getCsrfToken = async () => {
      const token = ref<string | null>()
      await nuxtApp.callHook('apollo:csrf', { token, client: key })

      return token.value
    }

    const csrfLink = setContext(async (_, { headers }) => {
      const token = await getCsrfToken()

      if (!token) { return }

      return {
        headers: {
          ...headers,
          ...(requestCookies && requestCookies),
          [clientConfig.csrfHeader!]: token
        }
      }
    })

    const contextLink = setContext(async (_, prevContext: DefaultContext) => {
      const context = ref<null | DefaultContext>(null)
      await nuxtApp.callHook('apollo:link', { prevContext, context, client: key })

      if (!context.value) { return }

      return context.value
    })
    let baseLink = csrfLink.concat(authLink).concat(contextLink)

    // add persistedQueryLink if enabled
    let persistedLink
    if (clientConfig.persistedQueries) {
      persistedLink = createPersistedQueryLink({ sha256, useGETForHashedQueries: true })
    }
    // const httpEndLink = createHttpLink({
    //   ...(clientConfig?.httpLinkOptions && clientConfig.httpLinkOptions),
    //   uri: (process.client && clientConfig.browserHttpEndpoint) || clientConfig.httpEndpoint,
    //   headers: { ...(clientConfig?.httpLinkOptions?.headers || {}) }
    // })
    const httpEndLink = createUploadLink({
      ...(clientConfig?.httpLinkOptions && clientConfig.httpLinkOptions),
      uri: (process.client && clientConfig.browserHttpEndpoint) || clientConfig.httpEndpoint,
      headers: { ...(clientConfig?.httpLinkOptions?.headers || {}) }
    })
    const httpLink = baseLink.concat(httpEndLink)
    let wsLink: GraphQLWsLink | null = null

    if (process.client && clientConfig.wsEndpoint) {
      const wsClient = createRestartableClient({
        ...clientConfig.wsLinkOptions,
        url: clientConfig.wsEndpoint,
        connectionParams: async () => {
          const auth = await getAuth()
          const csrf = await getCsrfToken()

          if (!auth && !csrf) { return }

          return {
            ...(auth ? { [clientConfig.authHeader!]: auth } : {}),
            ...(csrf ? { [clientConfig.csrfHeader!]: csrf } : {})
          }
        }
      })

      wsLink = new GraphQLWsLink(wsClient)

      nuxtApp._apolloWsClients = nuxtApp._apolloWsClients || {}
      nuxtApp._apolloWsClients[key] = wsClient
    }

    let pusherLink: PusherLink | null = null

    if (process.client && clientConfig.pusher) {
      pusherLink = new PusherLink({
        pusher: new Pusher(clientConfig.pusher.pusherAppKey, {
          wsHost: clientConfig.pusher.wsHost,
          wsPort: clientConfig.pusher.wsPort,
          forceTLS: clientConfig.pusher.forceTLS,
          disableStats: true,
          enabledTransports: ['ws', 'wss'],
          cluster: clientConfig.pusher.cluster,
          channelAuthorization: {
            endpoint: clientConfig.pusher.channelEndpoint,
            headersProvider () {
              const { token: csrfToken } = nuxtApp.$csrfToken()
              const { token: authToken } = nuxtApp.$authToken()
              return { 'X-CSRF-Token': csrfToken.value, authorization: `Bearer ${authToken.value}` }
            }
          }
        })
      })
    }
    const errorLink = onError((err) => {
      nuxtApp.callHook('apollo:error', err)
    })

    const link = pusherLink
      ? ApolloLink.from([
        errorLink,
        baseLink,
        pusherLink,
        ...(clientConfig.persistedQueries
          ? [
              split(({ query }) => {
                const definition = getMainDefinition(query)
                return (definition.kind === 'OperationDefinition' && definition.operation === 'query')
              },
              ApolloLink.from([persistedLink, httpEndLink]),
              httpEndLink)
            ]
          : [httpEndLink])
      ])
      : ApolloLink.from([
        errorLink,
        ...(!(wsLink)
          ? [httpLink]
          : [
              ...(clientConfig?.websocketsOnly
                ? [wsLink]
                : [
                    split(({ query }) => {
                      const definition = getMainDefinition(query)
                      return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
                    },
                    wsLink,
                    httpLink)
                  ])
            ])
      ])

    const cache = new InMemoryCache(clientConfig.inMemoryCacheOptions)

    clients[key] = new ApolloClient({
      link,
      cache,
      ...(NuxtApollo.clientAwareness && { name: key }),
      ...(process.server
        ? { ssrMode: true }
        : { ssrForceFetchDelay: 100 }),
      connectToDevTools: clientConfig.connectToDevTools || false,
      defaultOptions: clientConfig?.defaultOptions
    })

    if (!clients?.default && !NuxtApollo?.clients?.default && key === Object.keys(NuxtApollo.clients)[0]) {
      clients.default = clients[key]
    }

    const cacheKey = `_apollo:${key}`

    nuxtApp.hook('app:rendered', () => {
      nuxtApp.payload.data[cacheKey] = cache.extract()
    })

    if (process.client && nuxtApp.payload.data[cacheKey]) {
      cache.restore(destr(JSON.stringify(nuxtApp.payload.data[cacheKey])))
    }
  }

  provideApolloClients(clients)
  nuxtApp.vueApp.provide(ApolloClients, clients)
  nuxtApp._apolloClients = clients

  const defaultClient = clients?.default

  return {
    provide: {
      apolloHelpers: useApollo(),
      apollo: { clients, defaultClient }
    }
  }
})
