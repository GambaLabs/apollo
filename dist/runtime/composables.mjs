import { hash } from "ohash";
import { print } from "graphql";
import { ref, useCookie, useNuxtApp, useAsyncData } from "#imports";
import NuxtApollo from "#build/apollo";
export function useAsyncQuery(...args) {
  const { key, fn } = prep(...args);
  return useAsyncData(key, fn);
}
export function useLazyAsyncQuery(...args) {
  const { key, fn } = prep(...args);
  return useAsyncData(key, fn, { lazy: true });
}
const prep = (...args) => {
  const { clients } = useApollo();
  const query = args?.[0]?.query || args?.[0];
  const cache = args?.[0]?.cache ?? true;
  const variables = args?.[0]?.variables || typeof args?.[1] !== "string" && args?.[1] || void 0;
  let clientId = args?.[0]?.clientId || typeof args?.[1] === "string" && args?.[1] || void 0;
  if (!clientId || !clients?.[clientId]) {
    clientId = clients?.default ? "default" : Object.keys(clients)[0];
  }
  const key = args?.[0]?.key || hash({ query: print(query), variables, clientId });
  const fn = () => clients[clientId]?.query({ query, variables, fetchPolicy: "no-cache" }).then((r) => r.data);
  return { key, query, clientId, variables, fn };
};
export const useApollo = () => {
  const nuxtApp = useNuxtApp();
  const getToken = async (client) => {
    client = client || "default";
    const conf = NuxtApollo?.clients?.[client];
    const token = ref(null);
    await nuxtApp.callHook("apollo:auth", { token, client });
    if (token.value) {
      return token.value;
    }
    const tokenName = conf.tokenName;
    return conf?.tokenStorage === "cookie" ? useCookie(tokenName).value : process.client && localStorage.getItem(tokenName) || null;
  };
  const updateAuth = async ({ token, client, mode, skipResetStore }) => {
    client = client || "default";
    const conf = NuxtApollo?.clients?.[client];
    const tokenName = client && conf.tokenName;
    if (conf?.tokenStorage === "cookie") {
      const cookieOpts = client && conf?.cookieAttributes || NuxtApollo?.cookieAttributes;
      console.log("cookieOpts", cookieOpts);
      const cookie = useCookie(tokenName, cookieOpts);
      if (!cookie.value && mode === "logout") {
        return;
      }
      cookie.value = mode === "login" && token || null;
    } else if (process.client && conf?.tokenStorage === "localStorage") {
      if (mode === "login" && token) {
        localStorage.setItem(tokenName, token);
      } else if (mode === "logout") {
        localStorage.removeItem(tokenName);
      }
    }
    if (nuxtApp?._apolloWsClients?.[client]) {
      nuxtApp._apolloWsClients[client].restart();
    }
    if (skipResetStore) {
      return;
    }
    await nuxtApp?._apolloClients?.[client].resetStore().catch((e) => console.log("%cError on cache reset", "color: orange;", e.message));
  };
  return {
    /**
     * Retrieve the auth token for the specified client. Adheres to the `apollo:auth` hook.
     *
     * @param {string} client The client who's token to retrieve. Defaults to `default`.
     */
    getToken,
    /**
     * Access the configured apollo clients.
     */
    clients: nuxtApp?._apolloClients,
    /**
     * Apply auth token to the specified Apollo client, and optionally reset it's cache.
     *
     * @param {string} token The token to be applied.
     * @param {string} client - Name of the Apollo client. Defaults to `default`.
     * @param {boolean} skipResetStore - If `true`, the cache will not be reset.
     * */
    onLogin: (token, client, skipResetStore) => updateAuth({ token, client, skipResetStore, mode: "login" }),
    /**
     * Remove the auth token from the Apollo client, and optionally reset it's cache.
     *
     * @param {string} client - Name of the Apollo client. Defaults to `default`.
     * @param {boolean} skipResetStore - If `true`, the cache will not be reset.
     * */
    onLogout: (client, skipResetStore) => updateAuth({ client, skipResetStore, mode: "logout" })
  };
};
