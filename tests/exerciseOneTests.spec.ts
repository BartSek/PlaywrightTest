import { expect, test } from '../fixture/pomFixture'

test.beforeEach(async ({ exerciseOnePage, page }) => {
  await page.goto('https://antycaptcha.amberteam.pl/exercises/exercise1')
  await expect(exerciseOnePage.solutionOutput).toHaveText('Trail...')
})

test('Check correct solution message', async ({ exerciseOnePage }) => {
  const expectedSequence = await exerciseOnePage.getExpectedSequence()
  await exerciseOnePage.clickButtonsInSequence(expectedSequence)
  await expect(exerciseOnePage.solutionOutput).toHaveText(expectedSequence.join(''))
  await exerciseOnePage.checkSolutionButton.click()
  await expect(exerciseOnePage.solutionOutput).toHaveText('OK. Good answer')
})

test('Check wrong solution message', async ({ exerciseOnePage }) => {
  const expectedSequence = await exerciseOnePage.getExpectedSequence()
  const notExpectedSequence = await exerciseOnePage.getNotExpectedSequence(expectedSequence)
  await exerciseOnePage.clickButtonsInSequence(notExpectedSequence)
  await expect(exerciseOnePage.solutionOutput).toHaveText(notExpectedSequence.join(''))
  await exerciseOnePage.checkSolutionButton.click()
  await expect(exerciseOnePage.solutionOutput).toHaveText('NOT OK.')
})
