import type { Config } from 'jest'  
import nextJest from 'next/jest'  

const createJestConfig = nextJest({  
  dir: './',  
})  

const config: Config = {  
  coverageProvider: 'v8',  
  testEnvironment: 'jsdom',  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust according to your project structure
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}  

export default createJestConfig(config)  