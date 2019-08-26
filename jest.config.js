module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  setupFilesAfterEnv: [
    "jest-extended",
    "<rootDir>/test/jest/setupFilesAfterEnv.ts"
  ],
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/test/**/*.test.(ts|js)"],
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/{!(*.d.ts),}.{ts,js}"]
};
