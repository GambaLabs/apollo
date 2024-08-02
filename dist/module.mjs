import jiti from "file:///F:/projects/gamba/apollo/node_modules/.pnpm/jiti@1.21.0/node_modules/jiti/lib/index.js";

/** @type {import("F:/projects/gamba/apollo/src/module")} */
const _module = jiti(null, {
  "esmResolve": true,
  "interopDefault": true,
  "alias": {
    "@gambalabs/apollo": "F:/projects/gamba/apollo"
  }
})("F:/projects/gamba/apollo/src/module.ts");

export default _module;
export const defineApolloClient = _module.defineApolloClient;