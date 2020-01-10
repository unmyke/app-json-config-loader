const addModeToExpectedConfig = (config, env) => {
  return {
    ...config,
    mode: env,
  };
};
module.exports = addModeToExpectedConfig;
