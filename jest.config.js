module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: './tests/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
    '^@common/(.*)': '<rootDir>/src/common/$1',
    '^@modules/(.*)': '<rootDir>/src/modules/$1',
    '^@utils/(.*)': '<rootDir>/src/utils/$1',
    '^@config/(.*)': '<rootDir>/src/config/$1',
    '^@tests/(.*)': '<rootDir>/tests/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/prismaTestSetup.ts'],
  coverageReporters: ['json-summary']
};
