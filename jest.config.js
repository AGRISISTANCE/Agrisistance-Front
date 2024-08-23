module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
      '^@assets/(.*)$': '<rootDir>/src/assets/$1',
      '^views/(.*)$': '<rootDir>/src/views/$1',
      '^components/(.*)$': '<rootDir>/src/components/$1', // Add this line
    },
  };
  