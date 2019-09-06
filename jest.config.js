module.exports = {
  collectCoverageFrom: ["src/**/{!(*.d.ts),}.{ts,js}"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: ["js", "ts"],
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/test/jest/flex.test-data"
  ],
  setupFilesAfterEnv: [
    "jest-extended",
    "<rootDir>/test/jest/setupFilesAfterEnv.ts"
  ],
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.(ts|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
