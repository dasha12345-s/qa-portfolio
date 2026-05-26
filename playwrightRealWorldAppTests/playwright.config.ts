import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
      testDir: './tests',
      globalSetup: './global-setup',
      fullyParallel: true,
      retries: process.env.CI ? 2 : 0,
      reporter: 'html',
        use: {
    baseURL: 'http://localhost:3000',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
  },
    projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user1.json' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: '.auth/user1.json' },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: '.auth/user1.json' },
    },
    {
    name: 'mobile-chrome',
    use: { ...devices['Pixel 5'], storageState: '.auth/user1.json' },
  },
  {
    name: 'mobile-safari',
    use: { ...devices['iPhone 13'], storageState: '.auth/user1.json' },
  },
  ],
  });