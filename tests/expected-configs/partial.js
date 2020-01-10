import * as full from './full';

export const development = {
  api: full.development.api,
  web: full.development.web,
};

export const production = {
  api: full.production.api,
  web: full.production.web,
};

export const test = {
  api: full.test.api,
  web: full.test.web,
};

export const empty = {
  api: {},
  web: {},
};
