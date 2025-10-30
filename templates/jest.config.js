// jest.config.js
module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!src/**/*.d.ts",
    "!src/**/index.{js,ts}",
  ],
  coverageDirectory: "<rootDir>/coverage",
  verbose: true,
};
