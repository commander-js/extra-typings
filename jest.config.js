/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  injectGlobals: false,
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
  },
  testPathIgnorePatterns: ['/node_modules/'],
};

module.exports = config;
