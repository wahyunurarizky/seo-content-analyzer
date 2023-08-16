import { countChar, wordExists } from '../helper/helper'
import { getTranslation } from '../types'
import { AtomicChecker, SectionChecker } from './SectionChecker'

export class CheckTitle extends SectionChecker {
  constructor(text: string, keyword: string, t: getTranslation) {
    super('Page title score', text, keyword, t)
    this.checkLength()
    this.containsKeyword()
    this.keywordContainsOnBegining()
  }

  private checkLength() {
    const textLength = countChar(this.text)
    const perfectMinimum = 30
    const perfectMaximum = 60
    const diff = perfectMaximum - textLength

    const message = new AtomicChecker(
      'TITLE_LENGTH',
      this.t('TITLE_LENGTH', 'short', diff, textLength, perfectMaximum)
    )

    if (textLength > 0) {
      if (textLength > perfectMaximum) {
        message.score = 10
        message.text = this.t(
          'TITLE_LENGTH',
          'long',
          diff,
          textLength,
          perfectMaximum
        )
        message.status = 'good'
      } else if (textLength < perfectMinimum) {
        message.score = 10
        message.text = this.t(
          'TITLE_LENGTH',
          'short',
          diff,
          textLength,
          perfectMaximum
        )
        message.status = 'good'
      } else {
        message.score = 25
        message.text = this.t(
          'TITLE_LENGTH',
          'perfect',
          diff,
          textLength,
          perfectMaximum
        )
        message.status = 'perfect'
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
  private containsKeyword() {
    const message = new AtomicChecker(
      'TITLE_USE_KEYWORD',
      this.t('TITLE_USE_KEYWORD', 'not_used', this.keyword)
    )

    if (wordExists(this.text, this.keyword)) {
      message.score = 70
      message.text = this.t('TITLE_USE_KEYWORD', 'used', this.keyword)
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private keywordContainsOnBegining() {
    const message = new AtomicChecker(
      'TITLE_USE_KEYWORD_ON_BEGINNING',
      this.t('TITLE_USE_KEYWORD_ON_BEGINNING', 'not_used')
    )

    if (wordExists(this.text, this.keyword, 30)) {
      message.score = 5
      message.text = this.t(
        'TITLE_USE_KEYWORD_ON_BEGINNING',
        'used',
        this.keyword
      )
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
}
