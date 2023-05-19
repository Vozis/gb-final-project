const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'home',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
