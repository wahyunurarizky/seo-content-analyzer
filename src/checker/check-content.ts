import { countWords, getDensity, wordExists, splitSentences, countSentences, fleshReadingScore, longSectionExists, splitWords, usingPassiveVoice } from '../helper/helper'
import { getTranslation } from '../types'
import { AtomicChecker, SectionChecker } from './SectionChecker'

export class CheckContent extends SectionChecker {
  private domContent: Document

  constructor(domContent: Document, keyword: string, t: getTranslation) {
    const contentText =
      domContent.body?.innerText || domContent.body?.textContent || ''
    super('Content score', contentText, keyword, t)
    this.domContent = domContent

    this.checkContentMinimumWords()
    this.checkH1Exists()
    this.checkH1ContainsKeyword()
    this.checkFirstParagraphContainsKeyword()
    this.checkSectionsLength()
    this.checkDensity()
    this.checkLinkExists()
    this.checkImageExists()
    this.checkImageAltContainsKeword()
    this.checkImageTitleContainsKeword()
    this.checkSentencesLength()
    this.checkPassiveVoice()
    this.checkFleshReadability()
  }

  private checkContentMinimumWords() {
    const contentLength = countWords(this.text)
    const perfectMinimum = 300
    const goodMinimum = 150

    const message = new AtomicChecker(
      'CONTENT_MINIMUM_WORDS',
      this.t('CONTENT_MINIMUM_WORDS', 'short', perfectMinimum)
    )

    if (contentLength > 0) {
      if (contentLength >= perfectMinimum) {
        message.score = 21
        message.text = this.t('CONTENT_MINIMUM_WORDS', 'perfect', contentLength)
        message.status = 'perfect'
      } else if (contentLength >= goodMinimum) {
        message.score = 16
        message.status = 'good'
        message.text = this.t('CONTENT_MINIMUM_WORDS', 'good', contentLength)
      } else {
        message.score = 1
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkH1Exists() {
    const listOfH1 = this.domContent.getElementsByTagName('h1')

    const message = new AtomicChecker(
      'H1_EXIST',
      this.t('H1_EXIST', 'not_exists')
    )

    if (listOfH1.length > 0) {
      for (const h1 of listOfH1) {
        if (!!h1.textContent?.trim()) {
          message.score = 5
          message.text = this.t('H1_EXIST', 'exists')
          message.status = 'perfect'
          break
        }
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
  private checkH1ContainsKeyword() {
    const listOfH1 = this.domContent.getElementsByTagName('h1')

    const message = new AtomicChecker(
      'H1_USE_KEYWORD',
      this.t('H1_USE_KEYWORD', 'not_used', this.keyword)
    )

    if (listOfH1.length > 0) {
      for (const h1 of listOfH1) {
        if (wordExists(h1.textContent || '', this.keyword)) {
          message.score = 14
          message.text = this.t('H1_USE_KEYWORD', 'used', this.keyword)
          message.status = 'perfect'
          break
        }
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkFirstParagraphContainsKeyword() {
    const firstParagraph = this.domContent.querySelector('p')

    const message = new AtomicChecker(
      'FIRST_PARAGRAPH_CONTAINS_KEYWORD',
      this.t('FIRST_PARAGRAPH_CONTAINS_KEYWORD', 'not_used', this.keyword)
    )

    if (
      firstParagraph &&
      wordExists(firstParagraph.textContent || '', this.keyword)
    ) {
      message.score = 5
      message.text = this.t(
        'FIRST_PARAGRAPH_CONTAINS_KEYWORD',
        'used',
        this.keyword
      )
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkSectionsLength() {
    const message = new AtomicChecker(
      'SECTIONS_LENGTH',
      this.t('SECTIONS_LENGTH', 'bad')
    )

    const elements = Array.from(this.domContent.body.children)
    if (!longSectionExists(elements)) {
      message.score = 5
      message.text = this.t(
        'SECTIONS_LENGTH',
        'perfect',
      )
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkDensity() {
    const message = new AtomicChecker(
      'DENSITY',
      this.t('DENSITY', 'bad', this.keyword)
    )

    const [densityResult, keywordFound] = getDensity(this.text, this.keyword)

    if (densityResult > 0) {
      message.score = 15
      message.text = this.t(
        'DENSITY',
        'perfect',
        densityResult,
        this.keyword,
        keywordFound
      )
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkLinkExists() {
    const aTags = this.domContent.getElementsByTagName('a')
    const message = new AtomicChecker(
      'LINK_EXISTS',
      this.t('LINK_EXISTS', 'not_exists')
    )

    if (aTags.length > 0) {
      message.text = this.t('LINK_EXISTS', 'exists', aTags.length)
      message.status = 'perfect'
      message.score = 5
    }
    this.score += message.score

    this.messages.push(message.getResult())
  }

  private checkImageExists() {
    const imageTags = this.domContent.getElementsByTagName('img')
    const message = new AtomicChecker(
      'IMG_EXISTS',
      this.t('IMG_EXISTS', 'not_exists')
    )

    if (imageTags.length > 0) {
      message.text = this.t('IMG_EXISTS', 'exists')
      message.status = 'perfect'
      message.score = 5
    }
    this.score += message.score

    this.messages.push(message.getResult())
  }

  private checkImageAltContainsKeword() {
    const listOfImg = this.domContent.getElementsByTagName('img')

    const message = new AtomicChecker(
      'IMG_ALT_USE_KEYWORD',
      this.t('IMG_ALT_USE_KEYWORD', 'not_used', this.keyword)
    )

    if (listOfImg.length > 0) {
      for (const img of listOfImg) {
        if (img.alt && wordExists(img.alt, this.keyword)) {
          message.score = 5
          message.text = this.t('IMG_ALT_USE_KEYWORD', 'used', this.keyword)
          message.status = 'perfect'
          break
        }
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
  private checkImageTitleContainsKeword() {
    const listOfImg = this.domContent.getElementsByTagName('img')

    const message = new AtomicChecker(
      'IMG_TITLE_USE_KEYWORD',
      this.t('IMG_TITLE_USE_KEYWORD', 'not_used', this.keyword)
    )

    if (listOfImg.length > 0) {
      for (const img of listOfImg) {
        if (img.title && wordExists(img.title, this.keyword)) {
          message.score = 5
          message.text = this.t('IMG_TITLE_USE_KEYWORD', 'used', this.keyword)
          message.status = 'perfect'
          break
        }
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
  private checkSentencesLength() {
    const sentences = splitSentences(this.text)
    const numberOfSentences = countSentences(this.text)
    let longSentences = 0
    let percentage: number
    if (numberOfSentences > 0) {
      for (const sentence of sentences) {
        if (countWords(sentence) > 20) {
          longSentences += 1;
        }
      }
      percentage = Math.round((longSentences / numberOfSentences) * 100)
    } else {
      percentage = 0
    }
    const message = new AtomicChecker(
      'SENTENCES_LENGTH',
      this.t('SENTENCES_LENGTH', 'long', percentage)
    )
    if (percentage < 10)
    {
      message.score = 5
      message.text = this.t('SENTENCES_LENGTH', 'perfect', percentage)
      message.status = 'perfect'
    } else if (percentage < 20) {
      message.score = 3
      message.status = 'good'
      message.text = this.t('SENTENCES_LENGTH', 'good', percentage)
    }
    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkPassiveVoice() {
    const perfectMinimum = 10
    const goodMinimum = 20

    const message = new AtomicChecker(
      'PASSIVE_VOICE',
      this.t('PASSIVE_VOICE', 'bad', goodMinimum)
    )

    const sentences = splitSentences(this.text)
    const numberOfSentences = countSentences(this.text)
    
    let numberOfPassiveSentences: number = 0
    let result: boolean
    sentences.forEach((sentence) => {
      result = usingPassiveVoice(sentence)
      console.log(result)
      if (result) {
        numberOfPassiveSentences += 1
      }
    })

    const passivePercentage = Math.round(numberOfPassiveSentences * 100 / numberOfSentences)

    if (passivePercentage < 10) {
      message.score = 5
      message.text = this.t('PASSIVE_VOICE', 'perfect', passivePercentage)
      message.status = 'perfect'
    } else if (passivePercentage < 20) {
      message.score = 3
      message.text = this.t('PASSIVE_VOICE', 'good', passivePercentage)
      message.status = 'good'
    } else {
      message.score = 0
      message.text = this.t('PASSIVE_VOICE', 'bad', passivePercentage)
      message.status = 'bad'
    }
    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkFleshReadability() {
    let score = fleshReadingScore(this.text)

    const message = new AtomicChecker(
      'FLESH_READING',
      this.t('FLESH_READING', 'difficult', score)
    )

    if (score > 60) {
      message.score = 5
      message.text = this.t('FLESH_READING', 'perfect', score)
      message.status = 'perfect'
    } else if (score > 40) {
      message.score = 3
      message.text = this.t('FLESH_READING', 'good', score)
      message.status = 'good'
    }
    this.score += message.score
    this.messages.push(message.getResult())
  }
}
