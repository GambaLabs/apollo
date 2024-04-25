export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxtjs/apollo'],

  colorMode: {
    preference: 'dark',
    storageKey: 'na-color-scheme'
  },

  apollo: {
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
      }
    }
  }
})
