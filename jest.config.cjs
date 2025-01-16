module.exports = {
    preset: "ts-jest", // Use ts-jest for TypeScript support
    testEnvironment: "jest-environment-jsdom", // Simulates a browser-like environment
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files
      "^.+\\.(js|jsx)$": "babel-jest", // Optional: Transform JavaScript files if needed
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // File extensions to test
  };