const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'notifications',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
