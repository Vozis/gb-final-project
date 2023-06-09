// Core libraries such as react, angular, redux, ngrx, etc. must be
// singletons. Otherwise the applications will not work together.
const coreLibraries = new Set([
  'react',
  'react-dom',
  'react-router-dom',
  'redux',
  'react-redux',
  'react-toastify',
  '@emotion/react',
  '@tanstack/react-query',
  '@project/shared/providers',
  '@project/shared/layout',
  'framer-motion',
]);

module.exports = {
  // Share core libraries, and avoid everything else
  shared: (libraryName, defaultConfig) => {
    if (coreLibraries.has(libraryName)) {
      return defaultConfig;
    }
    // Returning false means the library is not shared.
    return false;
  },
};
