export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxtjs/apollo'],

  colorMode: {
    preference: 'dark',
    storageKey: 'na-color-scheme'
  },

  apollo: {
    proxyCookies: true,
    clients: {
      default: './apollo/default.ts',
      github: {
        httpEndpoint: 'https://api.github.com/graphql',
        tokenStorage: 'cookie'
      },
      todos: {
        httpEndpoint: 'https://nuxt-gql-server-2gl6xp7kua-ue.a.run.app/query',
        wsEndpoint: 'wss://nuxt-gql-server-2gl6xp7kua-ue.a.run.app/query',
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'cache-and-network'
          }
        },
        httpLinkOptions: {
          headers: {
            'X-CUSTOM-HEADER': '123'
          }
        }
      },
      users: {
        // TODO: this endpoint is project case and not shared one, should be shared one once they provide
        httpEndpoint: 'https://aged-farm-ih4lzf6w0nlc.vapor-farm-f1.com/@',
        httpLinkOptions: {
          credentials: 'include' // NOTE: this is required if cookie should be sent for different domain
        },
        // NOTE: `X-CSRF-TOKEN` is default csrfHeader
        csrfHeader: 'X-CSRF-TOKEN'
      },
      gamba: {
        httpEndpoint: `${process.env.GRAPHQL_BASE_URL}/@/1`,
        httpLinkOptions: {
          credentials: 'include'
        },
        persistedQueries: false,
        pusher: {
          wsHost: process.env.PUSHER_WS_HOST!,
          cluster: process.env.PUSHER_CLUSTER!,
          channelEndpoint: `${process.env.GRAPHQL_BASE_URL}/broadcasting/auth`,
          pusherAppKey: process.env.PUSHER_APP_KEY!,
          forceTLS: !!process.env.PUSHER_FORCE_TLS!,
          activityTimeout: Number(process.env.PUSHER_ACTIVITY_TIMEOUT)!,
          wsPort: Number(process.env.PUSHER_WS_PORT)!
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      graphqlBaseUrl: process.env.GRAPHQL_BASE_URL
    }
  }
})
