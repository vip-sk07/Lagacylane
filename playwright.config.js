import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,  // Sequential – tests share auth state
  forbidOnly: false,
  retries: 1,
  workers: 1,
  timeout: 30000,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:5000',
    headless: true,
    screenshot: 'on',
    video: 'on-first-retry',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 20000,
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'node Backend/index.js',
    url: 'http://localhost:5000/api/health',
    reuseExistingServer: true,
    timeout: 15000,
  }
});
