import { Page } from 'playwright';
import config from 'config';
import { Locator } from '@playwright/test';
import settings from '../settings/settings';

export type Language = 'pl' | 'en' | 'de';
type ExpectedState = 'attached' | 'detached' | 'visible' | 'hidden';
type PagePath = 'page_pl.html' | 'page_en.html' | 'page_de.html';

type PagePaths = { [key in Language]: PagePath };

const pagePaths: PagePaths = {
    'pl': 'page_pl.html',
    'en': 'page_en.html',
    'de': 'page_de.html'
};

export default abstract class BasePage {

    protected constructor(protected readonly page: Page) {}

    protected async isAttached(locator: Locator, timeout = settings.std_timeout): Promise<boolean> {
        return await this.isState(locator, 'attached', timeout);
    }

    protected async isDetached(locator: Locator, timeout = settings.std_timeout): Promise<boolean> {
        return await this.isState(locator, 'detached', timeout);
    }

    protected async isHidden(locator: Locator, timeout = settings.std_timeout): Promise<boolean> {
        return await this.isState(locator, 'hidden', timeout);
    }

    protected async isVisible(locator: Locator, timeout = settings.std_timeout): Promise<boolean> {
        return await this.isState(locator, 'visible', timeout);
    }

    protected async navigate(path: Language): Promise<void> {
        const url = await config.get('myUrl');
        await url && (await this.page.goto(`${await url}/${pagePaths[path]}`));
    }

    protected async waitForAttached(locator: Locator, timeout = settings.std_timeout): Promise<void> {
        await this.waitForState(locator, 'attached', timeout);
    }

    protected async waitForDetached(locator: Locator, timeout = settings.std_timeout): Promise<void> {
        await this.waitForState(locator, 'detached', timeout);
    }

    protected async waitForHidden(locator: Locator, timeout = settings.std_timeout): Promise<void> {
        await this.waitForState(locator, 'hidden', timeout);
    }

    protected async waitForVisible(locator: Locator, timeout = settings.std_timeout): Promise<void> {
        await this.waitForState(locator, 'visible', timeout);
    }

    private async isState(
        element: any,
        state: ExpectedState,
        timeout: number = settings.assertion_timeout
    ): Promise<boolean> {
        try {
            await this.waitForState(element, state, timeout);
            return true;
        } catch (err) {
            return false;
        }
    }

    private async waitForState(
        locator: Locator,
        expectedState: ExpectedState,
        waitTimeout = settings.std_timeout
    ): Promise<void> {
        await locator.waitFor({ state: expectedState, timeout: waitTimeout });
    }
}
