import { test as base } from '@playwright/test';

type MyFixtures = {
    fixture1: TestData;
    fixture2: TestData;
}

type TestData = {
    username: string;
    password: string;
}

export const test = base.extend<MyFixtures>({
    fixture1: async ({ page }, use) => {
        const fixture: TestData = {
            username: 'qwe123@pl.pl',
            password: '',
        };
        console.log('do sth with', page);
        await use(fixture);
    },
    fixture2: async ({ page }, use) => {
        const fixture: TestData = {
            username: 'qqq@www.eee',
            password: '',
        };
        console.log('do sth with', page);
        await use(fixture);
    }
});

export { expect } from '@playwright/test';
