import * as partial from './partial';
import nonexistent from './nonexistent';

export const development = {
  ...partial.development,
  ...nonexistent,
};

export const production = {
  ...partial.production,
  ...nonexistent,
};

export const test = {
  ...partial.test,
  ...nonexistent,
};

export const empty = {
  ...partial.empty,
  ...nonexistent,
};
