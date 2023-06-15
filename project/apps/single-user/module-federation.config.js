const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'single-user',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
