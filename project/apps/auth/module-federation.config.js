const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'auth',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
