export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass|svg)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
