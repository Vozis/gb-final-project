const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'confirm-email',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
