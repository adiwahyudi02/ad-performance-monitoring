import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  preset: "ts-jest",

  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      },
    ],
  },

  transformIgnorePatterns: [
    "/node_modules/(?!YOUR_MODULE_NAME)",
    "\\.pnp\\.[^\\/]+$",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "next/font/google": "<rootDir>/__mocks__/next/font/google.js",
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
};

export default config;
