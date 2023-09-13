import { test as baseTest } from '@playwright/test';
import { ExerciseOnePage } from '../pages/exerciseOnePage';

type pages = {
    exerciseOnePage: ExerciseOnePage        
}

const testPages = baseTest.extend<pages>({
    exerciseOnePage: async ({ page }, use) => {
        await use(new ExerciseOnePage(page));
    }
})

export const test = testPages;
export const expect = testPages.expect;