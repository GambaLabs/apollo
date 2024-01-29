# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.0.0-alpha.10](https://github.com/GambaLabs/apollo/compare/v6.0.0-alpha.9...v6.0.0-alpha.10) (2024-01-29)

## [6.0.0-alpha.9](https://github.com/GambaLabs/apollo/compare/v6.0.0-alpha.7...v6.0.0-alpha.9) (2024-01-29)

## [6.0.0-alpha.8](https://github.com/GambaLabs/apollo/compare/v6.0.0-alpha.7...v6.0.0-alpha.8) (2023-12-21)

## [6.0.0-alpha.7](https://github.com/GambaLabs/apollo/compare/v6.0.0-alpha.6...v6.0.0-alpha.7) (2023-08-26)

## [6.0.0-alpha.6](https://github.com/GambaLabs/apollo/compare/v6.0.0-alpha.5...v6.0.0-alpha.6) (2023-08-26)

## [6.0.0-alpha.5](https://github.com/GambaLabs/apollo/compare/v6.0.0-alpha.4...v6.0.0-alpha.5) (2023-08-26)

## [6.0.0-alpha.4](https://github.com/GambaLabs/apollo/compare/v6.0.0-alpha.3...v6.0.0-alpha.4) (2023-08-26)

## [6.0.0-alpha.3](https://github.com/GambaLabs/apollo/compare/v6.0.0-alpha.2...v6.0.0-alpha.3) (2023-08-26)

## [6.0.0-alpha.2](https://github.com/GambaLabs/apollo/compare/v6.0.0-alpha.1...v6.0.0-alpha.2) (2023-08-26)

## [6.0.0-alpha.1](https://github.com/GambaLabs/apollo/compare/v6.0.0-alpha.0...v6.0.0-alpha.1) (2023-08-26)

## 6.0.0-alpha.0 (2023-08-26)


### ⚠ BREAKING CHANGES

* Support Nuxt 3 (#430)
* errorHandler option

### Features

* add type definition for nuxt configuration ([d6e9db8](https://github.com/GambaLabs/apollo/commit/d6e9db8ac9a8c57c2eda078aede914191c85a962))
* allow opting out of apollo client awareness ([5a2421e](https://github.com/GambaLabs/apollo/commit/5a2421eabe2507515c6bf5582cbaf6bc45837ea8))
* **automatic-persisted-query:** add support automatic persisted query ([31251ab](https://github.com/GambaLabs/apollo/commit/31251abeb45e8cfff2305612aa072fca040386b2))
* **csrf:** add support csrfLink, config, playground ([b2c9d77](https://github.com/GambaLabs/apollo/commit/b2c9d771b604a213a5751da02864bc389aaff2ec))
* **docs:** upgrade to latest Docus ([#457](https://github.com/GambaLabs/apollo/issues/457)) ([1d71e63](https://github.com/GambaLabs/apollo/commit/1d71e6361541fa422e6c9aab073c09b58b7c1adf))
* **link:** allow custom link using setContext ([5c7446c](https://github.com/GambaLabs/apollo/commit/5c7446c002aff5c6e806f7d5a8e0556c2d57287e))
* **pusher:** bind event ([969aa8f](https://github.com/GambaLabs/apollo/commit/969aa8f0c2291e5893baad325924ee0ae970b77e))
* **pusher:** channel authorize ([2a01026](https://github.com/GambaLabs/apollo/commit/2a01026f67ae896c4e2bed1763fb9ee073247c1f))
* **pusher:** csrf token ([68a6f39](https://github.com/GambaLabs/apollo/commit/68a6f39c3f7ff16479d70b5d46ad3173fec9bf01))
* **pusher:** pusher subscription support ([cdb951a](https://github.com/GambaLabs/apollo/commit/cdb951aaf5751b6f2423341b2f3d376e495b1b65))
* set token expiration ([3eef55d](https://github.com/GambaLabs/apollo/commit/3eef55d933fb60bb9923084730d9ca678d29c890))
* support js-cookie attributes ([87337e2](https://github.com/GambaLabs/apollo/commit/87337e247ed63c235fa1fea3961f5aadc7f2e511))
* Support Nuxt 3 ([#430](https://github.com/GambaLabs/apollo/issues/430)) ([4321552](https://github.com/GambaLabs/apollo/commit/43215521047ed4fe2dbe2c0160bdd10d97021db4))
* **types:** provide nuxt 2.9 compatible types ([cfef95c](https://github.com/GambaLabs/apollo/commit/cfef95cb95f6ec2561d481126c9f6795aee450c8))


### Bug Fixes

* account for null onCacheInit ([e79e9ef](https://github.com/GambaLabs/apollo/commit/e79e9ef216c87f181bc82a46e7d557a940285c31))
* add missing fallback for onLogin helper ([f0b55ee](https://github.com/GambaLabs/apollo/commit/f0b55ee900274515c0a010db8f6cb19410c3dc91))
* allow any cache on client ([e7c776e](https://github.com/GambaLabs/apollo/commit/e7c776e9aa255859be4cd4c1806a57773f7a76fa))
* allow apollo:auth hook in production ([d1d3caf](https://github.com/GambaLabs/apollo/commit/d1d3caf17595d7ddab6cad0425701f10af5d384a)), closes [#461](https://github.com/GambaLabs/apollo/issues/461)
* allow omitting authType ([94de367](https://github.com/GambaLabs/apollo/commit/94de367a60a6e8157306219388bf26b21738e57c)), closes [#448](https://github.com/GambaLabs/apollo/issues/448)
* avoid optimizing `apollo-composable` ([a216f3c](https://github.com/GambaLabs/apollo/commit/a216f3c7f717cd6b2d0ea0688cdb07381163abfe))
* break reference to state object ([6641b68](https://github.com/GambaLabs/apollo/commit/6641b68628a4b5803a4da40f6e726dbd993d80a2))
* call await for prefetchAll ([5ad3117](https://github.com/GambaLabs/apollo/commit/5ad31177dacc8ca243db9677d62fc48ff0214186))
* Cannot read property 'freezeResults' of null ([0abffbf](https://github.com/GambaLabs/apollo/commit/0abffbf765a525cc20e10f9179e7c18659ba7508))
* clear cache after every request in ssr ([a888216](https://github.com/GambaLabs/apollo/commit/a8882162edbeaed9bdf8ca4db44b3d24e5a37f1d))
* Correcting the use of the config for cache ([f27a9ed](https://github.com/GambaLabs/apollo/commit/f27a9ed13e8f4e17ead7d6f056ece4b69ce0e268))
* enable fallback to default client ([b322370](https://github.com/GambaLabs/apollo/commit/b322370c6482c380fde44b523626fcd22e341afd))
* **eslint:** Fix eslint errors ([c08bcb3](https://github.com/GambaLabs/apollo/commit/c08bcb331db4b776a7cbec32ee0a3f68b9068abf))
* fallback typo & lint ([e6f2ca9](https://github.com/GambaLabs/apollo/commit/e6f2ca9b814d725233075d8079f37a81a79d4930))
* Fix of checks and refactoring ([fa23997](https://github.com/GambaLabs/apollo/commit/fa239976b826f5657bc86ad976c7c8118ecf575d))
* handle externalized dep ([ac9ddae](https://github.com/GambaLabs/apollo/commit/ac9ddaea1113dfaeb6d62fbb4226aeb25833a961))
* infer default client when not explicitly named ([6015e0a](https://github.com/GambaLabs/apollo/commit/6015e0a6bbc8e0ea0f352727120608f1a6934de3))
* null check for apolloWsClients ([f1d30fa](https://github.com/GambaLabs/apollo/commit/f1d30faf370bb952908b4bcc2fb69f7c04e383ca))
* **plugin:** check if __NUXT__.apollo exists ([640ba3e](https://github.com/GambaLabs/apollo/commit/640ba3e6e543e368cebbb0b707983e4e61856ba2))
* **pusher:** channel name private prefix ([faf052b](https://github.com/GambaLabs/apollo/commit/faf052b537221d73c0a5e7f829cc00f298ad26c6))
* **pusher:** config ([83007a1](https://github.com/GambaLabs/apollo/commit/83007a1c809d278117eae0dab586a6880b70a8f9))
* **pusher:** env variables for pusher config ([48e4699](https://github.com/GambaLabs/apollo/commit/48e46991eba55c5956a36c92330b6f6202d5bf0a))
* **pusher:** event connect ([ef739ec](https://github.com/GambaLabs/apollo/commit/ef739ece508b57bf899bf1afd9789ca79c6b0084))
* **pusher:** event data handle ([cc6a53e](https://github.com/GambaLabs/apollo/commit/cc6a53efecd6219f0f18963de5be9962bf132ff0))
* **pusher:** pusher cluster env.local ([ed4679c](https://github.com/GambaLabs/apollo/commit/ed4679c7bbd9677cf92b4978d9c04dd11d3d3cab))
* **pusher:** transport ajax ([6c89bab](https://github.com/GambaLabs/apollo/commit/6c89bab61f9e1d83b64c6cf0c3ae92d728ff5dbb))
* **pusher:** transport of authchannel ([958dc63](https://github.com/GambaLabs/apollo/commit/958dc635119bc46c9d32f9db8d024dae51bce257))
* serialize cookie attributes ([8c72542](https://github.com/GambaLabs/apollo/commit/8c72542b37cb086b66c32bd797fb8960b46bf928))
* server side renderings ([2c11f4e](https://github.com/GambaLabs/apollo/commit/2c11f4ef38ca1ff0f4834f8ab932a4be751818a5))
* tokenExpires is an integer, not a string | thanks to [@timhanlon](https://github.com/timhanlon) ([d369401](https://github.com/GambaLabs/apollo/commit/d3694016ebe579e46ddcda0c4ddeafcdbe0bb302))
* types typo ([2459c09](https://github.com/GambaLabs/apollo/commit/2459c09d51088c5cf1ee21ca76d0a7b3d6d5453b))
* **types:** add $apolloHelpers on context ([5b1a204](https://github.com/GambaLabs/apollo/commit/5b1a20464f08e802ef46cbb2c43dfbde94f3de27))
* **types:** add $apolloHelpers on context ([e6b42f2](https://github.com/GambaLabs/apollo/commit/e6b42f25beaff5875819cb3e0097087b52d12c9c))
* **types:** add options for fix types check ([2e2e5b2](https://github.com/GambaLabs/apollo/commit/2e2e5b2c9eaa6fa017ebdb0458d2f4ac1803e9b0))
* **types:** export client config interface ([90b5d69](https://github.com/GambaLabs/apollo/commit/90b5d6995b0c2cd581fff808efddc35f16f4e90c))


* Merge pull request #218 from nuxt-community/extend-errorHandler ([d5edade](https://github.com/GambaLabs/apollo/commit/d5edadef4489aee6d48fcfede09ebf5188bfb673)), closes [#218](https://github.com/GambaLabs/apollo/issues/218)

## [5.0.0-alpha.3](https://github.com/nuxt-modules/apollo-module/compare/v5.0.0-alpha.2...v5.0.0-alpha.3) (2022-10-19)


### Bug Fixes

* infer default client when not explicitly named ([6015e0a](https://github.com/nuxt-modules/apollo-module/commit/6015e0a6bbc8e0ea0f352727120608f1a6934de3))
* null check for apolloWsClients ([f1d30fa](https://github.com/nuxt-modules/apollo-module/commit/f1d30faf370bb952908b4bcc2fb69f7c04e383ca))

### [4.0.1-rc.5](https://github.com/nuxt-community/apollo-module/compare/v4.0.1-rc.4...v4.0.1-rc.5) (2020-11-13)

### [4.0.1-rc.4](https://github.com/nuxt-community/apollo-module/compare/v4.0.1-rc.3...v4.0.1-rc.4) (2020-10-18)


### Bug Fixes

* server side renderings ([2c11f4e](https://github.com/nuxt-community/apollo-module/commit/2c11f4ef38ca1ff0f4834f8ab932a4be751818a5))

### [4.0.1-rc.3](https://github.com/nuxt-community/apollo-module/compare/v4.0.1-rc.2...v4.0.1-rc.3) (2020-08-08)

### [4.0.1-rc.2](https://github.com/nuxt-community/apollo-module/compare/v4.0.1-rc.1...v4.0.1-rc.2) (2020-08-08)


### Bug Fixes

* break reference to state object ([6641b68](https://github.com/nuxt-community/apollo-module/commit/6641b68628a4b5803a4da40f6e726dbd993d80a2))

### [4.0.1-rc.1](https://github.com/nuxt-community/apollo-module/compare/v4.0.1-rc.0...v4.0.1-rc.1) (2020-05-15)


### Bug Fixes

* **plugin:** check if __NUXT__.apollo exists ([640ba3e](https://github.com/nuxt-community/apollo-module/commit/640ba3e6e543e368cebbb0b707983e4e61856ba2))
* **types:** export client config interface ([90b5d69](https://github.com/nuxt-community/apollo-module/commit/90b5d6995b0c2cd581fff808efddc35f16f4e90c))

### [4.0.1-rc.0](https://github.com/nuxt-community/apollo-module/compare/v4.0.0-rc.19...v4.0.1-rc.0) (2020-02-18)
