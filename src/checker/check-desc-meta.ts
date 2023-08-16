import { countChar, wordExists } from '../helper/helper'
import { getTranslation } from '../types'
import { AtomicChecker, SectionChecker } from './SectionChecker'

export class CheckDescMeta extends SectionChecker {
  constructor(text: string, keyword: string, t: getTranslation) {
    super('Meta description score', text, keyword, t)
    this.checkLength()
    this.containsKeyword()
  }

  private checkLength() {
    const textLength = countChar(this.text)
    const perfectMinimum = 100
    const perfectMaximum = 160
    const diff = perfectMaximum - textLength

    const message = new AtomicChecker(
      'DESC_META_LENGTH',
      this.t('DESC_META_LENGTH', 'short', diff, textLength, perfectMaximum)
    )

    if (textLength > 0) {
      if (textLength > perfectMaximum) {
        message.score = 10
        message.text = this.t(
          'DESC_META_LENGTH',
          'long',
          diff,
          textLength,
          perfectMaximum
        )
        message.status = 'good'
      } else if (textLength < perfectMinimum) {
        message.score = 10
        message.text = this.t(
          'DESC_META_LENGTH',
          'short',
          diff,
          textLength,
          perfectMaximum
        )
        message.status = 'good'
      } else {
        message.score = 85
        message.text = this.t(
          'DESC_META_LENGTH',
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
      'DESC_META_USE_KEYWORD',
      this.t('DESC_META_USE_KEYWORD', 'not_used', this.keyword)
    )

    if (wordExists(this.text, this.keyword)) {
      message.score = 15
      message.text = this.t('DESC_META_USE_KEYWORD', 'used', this.keyword)
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
}
