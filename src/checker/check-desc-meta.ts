import { countChar, wordExists } from '../helper/helper'
import { AtomicChecker, SectionChecker } from './SectionChecker'

export class CheckDescMeta extends SectionChecker {
  constructor(text: string, keyword: string) {
    super('Meta description score', text, keyword)
    this.checkLength()
    this.containsKeyword()
  }

  private checkLength() {
    const textLength = countChar(this.text)
    const perfectMinimum = 100
    const perfectMaximum = 160

    const message = new AtomicChecker(
      'DESC_META_LENGTH',
      `The Meta description is too short, ${
        perfectMaximum - textLength
      } characters available. (${textLength} of ${perfectMaximum} characters used)`
    )

    if (textLength > 0) {
      if (textLength > perfectMaximum) {
        message.score = 10
        message.text = `The Meta description length is too long, ${
          perfectMaximum - textLength
        } characters available. (${textLength} of ${perfectMaximum} characters used)`
        message.status = 'good'
      } else if (textLength < perfectMinimum) {
        message.score = 10
        message.text = `The Meta description length is too short, ${
          perfectMaximum - textLength
        } characters available. (${textLength} of ${perfectMaximum} characters used)`
        message.status = 'good'
      } else {
        message.score = 85
        message.text = `The Meta description length is perfect, ${
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
      'DESC_META_USE_KEYWORD',
      `The focus keyword "${this.keyword}" doesn't appear in the Meta description`
    )

    if (wordExists(this.text, this.keyword)) {
      message.score = 15
      message.text = `The focus keyword "${this.keyword}" is used in the Meta description`
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
}
