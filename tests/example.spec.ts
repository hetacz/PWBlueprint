import { test, expect } from '@playwright/test';
import OnlyPage from '../src/pages/pages/OnlyPage';
import config from 'config';
import { Language } from '../src/pages/BasePage';

type Tongue = { [key: string]: string | Tongue };

['en', 'de', 'pl'].forEach((language) => {
    test(`Check ${language}}`, async ({ page }) => {
        const tongue: Tongue = await config.get(language);
        const onlyPage: OnlyPage = new OnlyPage(page);
        await onlyPage.navigate(language as Language);
        await onlyPage.waitForHeader();
        expect(await onlyPage.getUrl()).toContain(tongue.url);
        expect(await onlyPage.getHeaderText()).toBe(tongue.h1);
        expect(await onlyPage.getParagraphText()).toBe(tongue.paragraph);
        if (await onlyPage.isFooterExisting()) {
            expect(await onlyPage.getFooterText()).toBe(tongue.footer);
        }
    });
});
