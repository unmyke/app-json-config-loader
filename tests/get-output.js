import { resolve } from 'path';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';

const loader = resolve(__dirname, '../src');
const configSets = './config-sets';
const inputDir = resolve(__dirname, configSets);
const outputDir = resolve(__dirname);
const bundleName = 'bundle';

module.exports = (fixture, { env, dir }) => {
  const entry = `./${fixture}`;

  const compiler = webpack({
    context: inputDir,
    entry,
    output: {
      path: outputDir,
      filename: bundleName,
    },
    module: {
      rules: [
        {
          test: /.json/,
          use: {
            loader,
            options: {
              env,
              dir,
            },
          },
        },
      ],
    },
  });

  compiler.outputFileSystem = new MemoryFS();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) return reject(err);

      try {
        resolve(JSON.parse(stats.toJson().modules[0].source));
      } catch (err) {
        reject(err);
      }
    });
  });
};
