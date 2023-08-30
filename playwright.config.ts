import { defineConfig, devices } from '@playwright/test';
import settings from './src/settings/settings';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
/**
 * See https://playwright.dev/docs/test-configuration.
 */
// @ts-ignore
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? settings.retries : 0,
    workers: process.env.CI ? settings.workers : undefined,
    reporter: 'html',
    outputDir: './reports/temp',
    use: {
        headless: process.env.HEADLESS !== 'false',
        screenshot: 'on',
        trace: 'on',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        }
    ],
    testIgnore: '*ignore',
    timeout: settings.std_timeout
    //expect: {}
});
