import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json', useESM: true }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // Fix for ESM path resolution when TS compiles to .js extensions:
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // stub styles/assets if you import them in components:
    '\\.(css|less|sass|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
};
export default config;
