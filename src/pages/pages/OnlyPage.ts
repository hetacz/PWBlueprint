import BasePage, { Language } from '../BasePage';
import { Page } from 'playwright';
import { Locator } from '@playwright/test';

export default class OnlyPage extends BasePage {

    private readonly footer: Locator = this.page.locator('h6');
    private readonly header: Locator = this.page.locator('#top');
    private readonly paragraph: Locator = this.page.locator('.text');

    public constructor(page: Page) {super(page);}

    public async isFooterExisting(): Promise<boolean> {
        return (await this.footer.all()).length > 0;
    }

    public async getFooterText(): Promise<string> {
        return await this.footer.innerText();
    }

    public async getHeaderText(): Promise<string> {
        return await this.header.innerText();
    }

    public async getParagraphText(): Promise<string> {
        return await this.paragraph.innerText();
    }

    public async getUrl(): Promise<string> {
        return this.page.url();
    }

    public override async navigate(language: Language): Promise<void> {
        await super.navigate(language);
    }

    public async waitForHeader(): Promise<void> {
        await this.header.waitFor();
    }
}
