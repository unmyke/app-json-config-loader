export const development = {
  api: {
    host: 'localhost',
    port: 4000,
    uri: '/api',
  },
  database: {
    host: 'db.localhost',
    port: 27017,
  },
  logging: {
    path: './logs/development.log',
    mode: 'debug',
  },
  web: {
    host: 'localhost',
    port: 8080,
  },
};
export const production = {
  api: {
    host: 'localhost',
    port: 4000,
    uri: '/api',
  },
  database: {
    host: 'db.localhost',
    port: 27017,
  },
  logging: {
    path: './logs/production.log',
    mode: 'warning',
  },
  web: {
    host: 'treetrunk.ru',
    port: 80,
  },
};

export const test = {
  api: {
    host: 'api.test.localhost',
    port: 4000,
    uri: '/api',
  },
  database: {
    host: 'db.test.localhost',
    port: 27017,
  },
  logging: {
    path: './logs/test.log',
    mode: 'info',
  },
  web: {
    host: 'localhost',
    port: 8080,
  },
};

export const empty = {
  api: {},
  database: {},
  logging: {},
  web: {},
};
