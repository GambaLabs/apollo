import type { ErrorResponse } from '@nuxtjs/apollo'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const csrfToken = ref<null | string>(null)
  const authToken = ref<null | string>(null)
  nuxtApp.provide('csrfToken', () => {
    const onReady = (fn: (token: string) => void) => {
      const stopWatch = watch(
        () => csrfToken.value,
        (token) => {
          if (token) {
            fn(token)
          }
        },
        { immediate: true }
      )
      return stopWatch
    }
    return {
      token: csrfToken,
      onReady
    }
  })
  nuxtApp.provide('authToken', () => {
    const onReady = (fn: (token: string) => void) => {
      const stopWatch = watch(
        () => authToken.value,
        (token) => {
          if (token) {
            fn(token)
          }
        },
        { immediate: true }
      )
      return stopWatch
    }
    return {
      token: authToken,
      onReady
    }
  })
  const fetchCsrf =
    process.client && fetch(`${config.public.graphqlBaseUrl}/auth/csrf-token`, {
      credentials: 'include'
    })
      .then(async (res) => {
        const json = await res.clone().json()
        try {
          csrfToken.value = json['x-csrf-token']
        } catch (e) {
          console.error('Failed to provide csrfToken', e)
        }
        return res
      })
      .catch(e => Promise.reject(e))
  // Nuxt Apollo auth hook
  nuxtApp.hook('apollo:auth', ({ client, token }) => {
    if (client !== 'todos') { return }

    // Pass token to the `todos` client
    token.value = '<secret_token>'
  })
  nuxtApp.hook('apollo:auth', ({ client, token }) => {
    if (client !== 'gamba') { return }

    // Pass token to the `todos` client
    token.value = '<secret_token>'
    authToken.value = '<secret_token>'
  })

  nuxtApp.hook('apollo:csrf', async ({ client, token, forceUpdate }) => {
    if (process.server) { return }
    // Check if client is app graphql, not hygraph
    if (client !== 'gamba') { return }
    // NOTE: we have only one client, so no need to check client here
    const existingToken = csrfToken.value

    if (existingToken && !forceUpdate) {
      token.value = existingToken
      return
    }
    const res = await fetchCsrf.catch(() => false)
    if (!res) {
      console.error('Failed to fetch csrf token')
      return
    }
    // TODO: need to handle expire time
    token.value = csrfToken.value
  })

  // Nuxt Apollo error hook
  nuxtApp.hook('apollo:error', (error: ErrorResponse) => {
    // eslint-disable-next-line no-console
    console.log('Apollo Error Handler', error)
  })
})
