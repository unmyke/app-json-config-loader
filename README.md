<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

<!-- [![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url] -->

# app-json-config-loader

Loads configuration as declared in the `json`-file scopes. Loader uses [get-json-config] as core to get scopes of configuration you stored. Tranform list of scopes of configuration to configuration object at build by [webpack] allows you to divide your configuration by scopes (for instance, configuration for api, database, logging modules), define which scopes must be shared between client and server and which must not be shared (database credentails must not to included to cleint bundle).

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `app-json-config-loader`:

```console
$ npm install --save-dev app-json-config-loader
```

Then add the loader to your `webpack` config. For example:

```json
// config/api.json
{
  "production": {
    "endPoint": "/api/v1"
  },
  "development": {
    "endPoint": "/dev_api/"
  },
  "test": {
    "endPoint": "/dev_api/"
  }
}
```

```json
// config/database.json
{
  "production": {
    "host": "db.expamle.host",
    "port": 27017,
    "username": "produsername",
    "password": "prodpassword"
  },
  "development": {
    "host": "localhost",
    "port": 27017,
    "username": "devusername",
    "password": "devpassword"
  },
  "test": {
    "host": "localhost",
    "port": 27117,
    "username": "testusername",
    "password": "testpassword"
  }
}
```

```json
// src/client/configs.json
["api"]
```

```json
// src/server/configs.json
["api", "database"]
```

```js
// webpack.server.config.js
module.exports = (env) => {
  module: {
    rules: [
      {
        test: /server\/configs\.json$/,
        use: [
          {
            loader: "app-json-config-loader",
            options: {
              env,                    // default process.env.NODE_ENV || "development",
              configPath: "./config"  // default "./config",
            }
          },
        ],
      },
    ],
  },
};
```

```js
// src/server/entry.js
const config = require('./configs.json');

// if development mode config will be:
//   {
//     api:
//       { endpoint: '/dev_api' },
//     database: {
//       host: "localhost",
//       port: 27017,
//       username: "devusername",
//       password: "devpassword"
//     }
//   }
```

```js
// src/client/entry.js
const config = require('./configs.json');

// if production mode config will be:
//   {
//     api:
//       { endpoint: '/dev_api' },
//   }

```

And run `webpack` via your preferred method.

## License

#### [MIT](./LICENSE)

<!-- [npm]: https://img.shields.io/npm/v/app-json-config-loader.svg
[npm-url]: https://npmjs.com/package/app-json-config-loader
[node]: https://img.shields.io/node/v/app-json-config-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/app-json-config-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/app-json-config-loader
[tests]: https://img.shields.io/circleci/project/github/webpack-contrib/app-json-config-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/app-json-config-loader
[cover]: https://codecov.io/gh/webpack-contrib/app-json-config-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/app-json-config-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack -->
[get-json-config]: https://github.com/unmyke/get-json-config
[webpack]: https://webpack.js.org
