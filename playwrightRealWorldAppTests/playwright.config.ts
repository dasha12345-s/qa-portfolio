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
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: '.auth/user.json' },
    },
  ],
  });