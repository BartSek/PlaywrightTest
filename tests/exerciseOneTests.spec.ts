import { expect, test } from '../fixture/pomFixture';

test.beforeEach(async ({ exerciseOnePage, page }) => {
  await page.goto('https://antycaptcha.amberteam.pl/exercises/exercise1');
  await expect(exerciseOnePage.solutionOutput).toHaveText("Trail...");
});

test('Check correct solution message', async ({ exerciseOnePage }) => {
  const expectedSequence = await exerciseOnePage.getExpectedSequence();
  if (expectedSequence !== null) {
    await exerciseOnePage.clickButtonsInSequence(expectedSequence);
    await expect(exerciseOnePage.solutionOutput).toHaveText(expectedSequence.join(''));
  } else {
    throw new Error('expectedSequence should not be null');
  }
  await exerciseOnePage.checkSolutionButton.click();
  await expect(exerciseOnePage.solutionOutput).toHaveText("OK. Good answer");
});

test('Check wrong solution message', async ({ exerciseOnePage }) => {
  const expectedSequence = await exerciseOnePage.getExpectedSequence();
  if (expectedSequence !== null) {
    const notExpectedSequence = await exerciseOnePage.getNotExpectedSequence(expectedSequence);
    await exerciseOnePage.clickButtonsInSequence(notExpectedSequence);
    await expect(exerciseOnePage.solutionOutput).toHaveText(notExpectedSequence.join(''));
  } else {
    throw new Error('expectedSequence should not be null');
  }
  await exerciseOnePage.checkSolutionButton.click();
  await expect(exerciseOnePage.solutionOutput).toHaveText("NOT OK.");
});