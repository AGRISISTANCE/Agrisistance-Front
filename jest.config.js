module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest", // Ensure Babel transforms JavaScript and JSX files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^views/(.*)$": "<rootDir>/src/views/$1",
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/styleMock.js",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/fileMock.js",
    "react-lottie": "<rootDir>/react-lottie.jsx",
    "^react-leaflet$": "<rootDir>/react-leaflet.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!react-leaflet|react-lottie|another-package-to-transform)",
  ],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
