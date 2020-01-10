const getOutput = require('./get-output');
const expectedConfigs = require('./expected-configs');
const addModeToExpectedConfig = require('./add-mode-to-expected-config');

const envs = {
  DEV: 'development',
  PROD: 'production',
  TEST: 'test',
};

const { warn } = console;

const dir = './tests/config';
const nonexistentDir = './config';

describe('#async', () => {
  beforeEach(() => {
    console.warn = jest.fn((message) => {
      // warn(message);
    });
  });
  afterEach(() => {
    console.warn = warn;
  });

  context('config directory exist', () => {
    context('takes all json config file names', () => {
      test('should return object contains configs from all json files per environment', () =>
        Promise.all([
          getOutput('full.json', { dir }),
          getOutput('full.json', { env: envs.TEST, dir }),
          getOutput('full.json', { env: envs.DEV, dir }),
          getOutput('full.json', { env: envs.PROD, dir }),
        ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
          expect(defaultConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.full[process.env.NODE_ENV],
              process.env.NODE_ENV
            )
          );
          expect(testConfig).toEqual(
            addModeToExpectedConfig(expectedConfigs.full[envs.TEST], envs.TEST)
          );
          expect(devConfig).toEqual(
            addModeToExpectedConfig(
              addModeToExpectedConfig(expectedConfigs.full[envs.DEV], envs.DEV),
              envs.DEV
            )
          );
          expect(prodConfig).toEqual(
            addModeToExpectedConfig(expectedConfigs.full[envs.PROD], envs.PROD)
          );
        }));
    });

    context('takes all and nonexistent json config file names', () => {
      test('should return object contains configs from all json files and with props with empty object for nonexistent names per environment', () =>
        Promise.all([
          getOutput('full-with-nonexistent.json', { dir }),
          getOutput('full-with-nonexistent.json', {
            env: envs.TEST,
            dir,
          }),
          getOutput('full-with-nonexistent.json', {
            env: envs.DEV,
            dir,
          }),
          getOutput('full-with-nonexistent.json', {
            env: envs.PROD,
            dir,
          }),
        ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
          expect(defaultConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.fullWithNonexistent[process.env.NODE_ENV],
              process.env.NODE_ENV
            )
          );
          expect(testConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.fullWithNonexistent[envs.TEST],
              envs.TEST
            )
          );
          expect(devConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.fullWithNonexistent[envs.DEV],
              envs.DEV
            )
          );
          expect(prodConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.fullWithNonexistent[envs.PROD],
              envs.PROD
            )
          );

          expect(console.warn).toBeCalledTimes(12);
        }));
    });

    context('takes partial json config file names', () => {
      test('should return object contains configs from partial json files per environment', () =>
        Promise.all([
          getOutput('partial.json', { dir }),
          getOutput('partial.json', { env: envs.TEST, dir }),
          getOutput('partial.json', { env: envs.DEV, dir }),
          getOutput('partial.json', { env: envs.PROD, dir }),
        ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
          expect(defaultConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.partial[process.env.NODE_ENV],
              process.env.NODE_ENV
            )
          );
          expect(testConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.partial[envs.TEST],
              envs.TEST
            )
          );
          expect(devConfig).toEqual(
            addModeToExpectedConfig(expectedConfigs.partial[envs.DEV], envs.DEV)
          );
          expect(prodConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.partial[envs.PROD],
              envs.PROD
            )
          );
        }));
    });

    context('takes nonexistent json config file names', () => {
      test('should return object contains props as passed names with empty object per environment', () =>
        Promise.all([
          getOutput('nonexistent.json', { dir }),
          getOutput('nonexistent.json', { env: envs.TEST, dir }),
          getOutput('nonexistent.json', { env: envs.DEV, dir }),
          getOutput('nonexistent.json', { env: envs.PROD, dir }),
        ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
          expect(defaultConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.nonexistent,
              process.env.NODE_ENV
            )
          );
          expect(testConfig).toEqual(
            addModeToExpectedConfig(expectedConfigs.nonexistent, envs.TEST)
          );
          expect(devConfig).toEqual(
            addModeToExpectedConfig(expectedConfigs.nonexistent, envs.DEV)
          );
          expect(prodConfig).toEqual(
            addModeToExpectedConfig(expectedConfigs.nonexistent, envs.PROD)
          );

          expect(console.warn).toBeCalledTimes(12);
        }));
    });

    context('takes partial and nonexistent json config file names', () => {
      test('should return object contains configs from partial json files and with props with empty object for nonexistent names per environment', () =>
        Promise.all([
          getOutput('partial-with-nonexistent.json', { dir }),
          getOutput('partial-with-nonexistent.json', {
            env: envs.TEST,
            dir,
          }),
          getOutput('partial-with-nonexistent.json', {
            env: envs.DEV,
            dir,
          }),
          getOutput('partial-with-nonexistent.json', {
            env: envs.PROD,
            dir,
          }),
        ]).then(([defaultConfig, testConfig, devConfig, prodConfig]) => {
          expect(defaultConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.partialWithNonexistent[process.env.NODE_ENV],
              process.env.NODE_ENV
            )
          );
          expect(testConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.partialWithNonexistent[envs.TEST],
              envs.TEST
            )
          );
          expect(devConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.partialWithNonexistent[envs.DEV],
              envs.DEV
            )
          );
          expect(prodConfig).toEqual(
            addModeToExpectedConfig(
              expectedConfigs.partialWithNonexistent[envs.PROD],
              envs.PROD
            )
          );

          expect(console.warn).toBeCalledTimes(12);
        }));
    });
  });

  context("config directory doesn't exists", () => {
    test('should return config object with empty object as requested props', () =>
      Promise.all([
        getOutput('full.json', { dir: nonexistentDir }),
        getOutput('full-with-nonexistent.json', {
          dir: nonexistentDir,
        }),
        getOutput('partial.json', { dir: nonexistentDir }),
        getOutput('partial-with-nonexistent.json', {
          dir: nonexistentDir,
        }),
        getOutput('nonexistent.json', {
          dir: nonexistentDir,
        }),
      ]).then(
        ([
          full,
          fullWithNonexistent,
          partial,
          partialWithNonexistent,
          nonexistent,
        ]) => {
          expect(full).toEqual(expectedConfigs.full.empty);
          expect(fullWithNonexistent).toEqual(
            expectedConfigs.fullWithNonexistent.empty
          );
          expect(partial).toEqual(expectedConfigs.partial.empty);
          expect(partialWithNonexistent).toEqual(
            expectedConfigs.partialWithNonexistent.empty
          );
          expect(nonexistent).toEqual(expectedConfigs.nonexistent);

          expect(console.warn).toBeCalledTimes(5);
        }
      ));
  });
});
