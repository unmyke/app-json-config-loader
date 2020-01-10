import * as full from './full';
import nonexistent from './nonexistent';

export const development = {
  ...full.development,
  ...nonexistent,
};

export const production = {
  ...full.production,
  ...nonexistent,
};

export const test = {
  ...full.test,
  ...nonexistent,
};

export const empty = {
  ...full.empty,
  ...nonexistent,
};
