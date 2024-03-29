module.exports = {
  collectCoverageFrom: ["src/**/{!(*.d.ts),}.{ts,js,.tsx,.jsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy"
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/test/jest/flex.test-data"],
  preset: "ts-jest",
  roots: ["<rootDir>/src", "<rootDir>/test"],
  setupFilesAfterEnv: ["jest-extended/all", "<rootDir>/test/jest/setupFilesAfterEnv.ts"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true
};
