const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'profile',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
