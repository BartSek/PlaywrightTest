import { Locator, Page } from '@playwright/test';

export class ExerciseOnePage {
  readonly page: Page;
  readonly solutionOutput: Locator;
  readonly checkSolutionButton: Locator;
  readonly trailCell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.solutionOutput = page.locator('#trail');
    this.checkSolutionButton = page.locator('#solution');
    this.trailCell = page.locator('td:has-text("Trail set to: ")');
  }

  async getExpectedSequence() {
    const trail = await this.trailCell.innerText();
    const sequenceText = trail.replace('Trail set to: ','');
    const sequenceArray = sequenceText.match((/.{1,2}/g));
    return sequenceArray
  }
  
  async getNotExpectedSequence(expectedSequence: string[]) {
    const notExpectedSequenceArray = expectedSequence.map(item => {
      if (item === "b1") {
        return "b2";
      } else if (item === "b2") {
        return "b1";
      } else {
        return item;
      }
    });
    return notExpectedSequenceArray;
  }
  
  async clickButtonsInSequence(sequenceArray: string[]) {
    let output = '';
    for (const buttonName of sequenceArray) {
      const button = await this.page.$(`button:has-text("${buttonName}")`);
      if (button) {   
        output = output + buttonName;
        await button.click();
        await this.checkOutputIsUpdated(output);
      } else {
        throw new Error(`Button "${buttonName}" not found`);
      }
    }
  }

  async checkOutputIsUpdated(output: string){
    await this.page.waitForFunction((text) => {
      const el = document.querySelector('#trail');
      return el && el.textContent === text;
    }, output);
  }
}