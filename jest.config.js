module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: './tests/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
    '^@common/(.*)': '<rootDir>/src/common/$1',
    '^@modules/(.*)': '<rootDir>/src/modules/$1',
    '^@utils/(.*)': '<rootDir>/src/utils/$1',
    '^@config/(.*)': '<rootDir>/src/config/$1',
    '^client': '<rootDir>/src/client',
    '^prismaTestSetup': '<rootDir>/src/prismaTestSetup'
  },
  setupFilesAfterEnv: ['<rootDir>/src/prismaTestSetup.ts']
};
