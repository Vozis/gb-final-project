const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'create-event',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
