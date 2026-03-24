/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/src/__tests__/**/*.ts",
    "**/src/__tests__/**/*.e2e-spec.ts",
    "**/test/**/*.ts"
  ],
};
