import { config } from 'dotenv';
import { LaunchOptions } from '@playwright/test';

config();

// const parseEnvToFloat = (value: string | undefined, def: number): number =>
//     (!Number.isNaN(parseFloat(value || def.toString())) && parseFloat(value || def.toString())) || def;
const parseEnvToInt = (value: string | undefined, def: number): number =>
    (Number.isInteger(parseInt(value || def.toString())) && parseInt(value || def.toString())) || def;

const browserOptions: LaunchOptions = {
    // slowMo: 500,
    timeout: parseEnvToInt(process.env.TIMEOUT, 180_000),
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
    firefoxUserPrefs: {
        'media.navigator.streams.fake': true,
        'media.navigator.permission.disabled': true,
    },
};

type SupportedBrowsers = 'chromium' | 'firefox' | 'webkit';
export type EnvUnderTest = 'test' | 'int' | 'prod';

interface ISettings {
    assertion_timeout: number;
    browser: SupportedBrowsers;
    browserOptions: LaunchOptions
    default_timeout: number;
    env: EnvUnderTest;
    // img_threshold: number;
    // img_tolerance: number;
    timeout: number;
    interval_timeout: number;
    long_timeout: number;
    short_timeout: number;
    std_timeout: number;
    viewport_height: number;
    viewport_width: number;
    retries: number;
    workers: number;
}

const settings: ISettings = {
    env: (process.env.NODE_ENV || 'int') as EnvUnderTest,
    browser: (process.env.WEB_BROWSER || 'chromium') as SupportedBrowsers,
    browserOptions,
    // img_threshold: parseEnvToFloat(process.env.IMG_THRESHOLD, 0.1),
    // img_tolerance: parseEnvToFloat(process.env.IMG_TOLERANCE, 0.02),
    viewport_width: parseEnvToInt(process.env.VIEWPORT_WIDTH, 1920),
    viewport_height: parseEnvToInt(process.env.VIEWPORT_HEIGHT, 1080),
    default_timeout: parseEnvToInt(process.env.DEFAULT_TIMEOUT, 120_000),
    timeout: parseEnvToInt(process.env.TIMEOUT, 180_000),
    long_timeout: parseEnvToInt(process.env.LONG_TIMEOUT, 60_000),
    std_timeout: parseEnvToInt(process.env.STD_TIMEOUT, 30_000),
    short_timeout: parseEnvToInt(process.env.SHORT_TIMEOUT, 10_000),
    assertion_timeout: parseEnvToInt(process.env.ASSERTION_TIMEOUT, 5_000),
    interval_timeout: parseEnvToInt(process.env.INTERNAL_TIMEOUT, 2_000),
    retries: parseEnvToInt(process.env.RETRIES, 1),
    workers: parseEnvToInt(process.env.WORKERS, 0),
};

export default settings;
