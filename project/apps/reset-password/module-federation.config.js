const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'reset-password',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
