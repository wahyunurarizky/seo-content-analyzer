import { countChar, wordExists } from '../helper/helper'
import { AtomicChecker, SectionChecker } from './SectionChecker'

export class CheckTitle extends SectionChecker {
  constructor(text: string, keyword: string) {
    super('Page title score', text, keyword)
    this.checkLength()
    this.containsKeyword()
    this.keywordContainsOnBegining()
  }

  private checkLength() {
    const textLength = countChar(this.text)
    const perfectMinimum = 30
    const perfectMaximum = 60

    const message = new AtomicChecker(
      'TITLE_LENGTH',
      `The Page title is too short, ${
        perfectMaximum - textLength
      } characters available. (${textLength} of ${perfectMaximum} characters used)`
    )

    if (textLength > 0) {
      if (textLength > perfectMaximum) {
        message.score = 10
        message.text = `The Page title length is too long, ${
          perfectMaximum - textLength
        } characters available. (${textLength} of ${perfectMaximum} characters used)`
        message.status = 'good'
      } else if (textLength < perfectMinimum) {
        message.score = 10
        message.text = `The Page title length is too short, ${
          perfectMaximum - textLength
        } characters available. (${textLength} of ${perfectMaximum} characters used)`
        message.status = 'good'
      } else {
        message.score = 25
        message.text = `The Page title length is perfect, ${
          perfectMaximum - textLength
        } characters available. (${textLength} of ${perfectMaximum} characters used)`
        message.status = 'perfect'
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
  private containsKeyword() {
    const message = new AtomicChecker(
      'TITLE_USE_KEYWORD',
      `The focus keyword "${this.keyword}" doesn't appear in the Page title`
    )

    if (wordExists(this.text, this.keyword)) {
      message.score = 70
      message.text = `The focus keyword "${this.keyword}" is used in the Page title`
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private keywordContainsOnBegining() {
    const message = new AtomicChecker(
      'TITLE_USE_KEYWORD_ON_BEGINNING',
      `Put the focus keyword at the beginning of the Page Title`
    )

    if (wordExists(this.text, this.keyword, 30)) {
      message.score = 5
      message.text = `The focus keyword "ASD" is used at the beginning of the Page Title`
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
}
