const baseConfig = require('../../module-federation.config');
module.exports = {
  ...baseConfig,
  name: 'settings',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
