import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import getConfig from 'get-json-config';

const schema = {
  type: 'object',
  properties: {
    env: {
      type: 'string',
    },
    dir: {
      type: 'string',
    },
  },
};
export default function(content, map, meta) {
  const {
    env = process.env.NODE_ENV || 'development',
    dir = './config',
  } = getOptions(this);
  validateOptions({ env, dir }, schema, 'Loader/Application Json Config');

  const { async, addDependency } = this;

  const callback = async();

  try {
    const names = JSON.parse(content);

    getConfig(names, { env, dir }).then(
      ({ config, files }) => {
        files.forEach(addDependency);
        callback(null, JSON.stringify(config), map, meta);
      },
      (error) => {
        callback(error);
      }
    );
  } catch (err) {
    throw err;
  }
}
