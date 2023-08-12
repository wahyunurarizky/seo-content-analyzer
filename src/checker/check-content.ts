import jsdom from 'jsdom'
const { JSDOM } = jsdom
import { countWords, getDensity, wordExists } from '../helper/helper'
import { AtomicChecker, SectionChecker } from './SectionChecker'

export class CheckContent extends SectionChecker {
  private domContent: jsdom.JSDOM
  private contentText: string

  constructor(text: string, keyword: string) {
    super('Content score', text, keyword)
    this.domContent = new JSDOM(text)
    this.contentText = this.domContent.window.document.body?.textContent || ''

    this.checkContentMinimumWords()
    this.checkH1Exists()
    this.checkH1ContainsKeyword()
    this.checkFirstParagraphContainsKeyword()
    this.checkDensity()
    this.checkLinkExists()
    this.checkImageExists()
    this.checkImageAltContainsKeword()
    this.checkImageTitleContainsKeword()
  }

  private checkContentMinimumWords() {
    const contentLength = countWords(this.contentText)
    const perfectMinimum = 300
    const goodMinimum = 150

    const message = new AtomicChecker(
      'CONTENT_MINIMUM_WORDS',
      `Your text doesn't contain enough words, a minimum of ${perfectMinimum} words is recommended`
    )

    if (contentLength > 0) {
      if (contentLength >= perfectMinimum) {
        message.score = 31
        message.text = `Your text contains (${contentLength}) words`
        message.status = 'perfect'
      } else if (contentLength >= goodMinimum) {
        message.score = 21
        message.status = 'good'
        message.text = `Your text contains (${contentLength}) words`
      } else {
        message.score = 1
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkH1Exists() {
    const listOfH1 = this.domContent.window.document.getElementsByTagName('h1')

    const message = new AtomicChecker('H1_EXIST', `You should add a H1`)

    if (listOfH1.length > 0) {
      for (const h1 of listOfH1) {
        if (!!h1.textContent?.trim()) {
          message.score = 5
          message.text = `You've added a H1`
          message.status = 'perfect'
          break
        }
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
  private checkH1ContainsKeyword() {
    const listOfH1 = this.domContent.window.document.getElementsByTagName('h1')

    const message = new AtomicChecker(
      'H1_USE_KEYWORD',
      `The focus keyword "${this.keyword}" doesn't appear in the H1`
    )

    if (listOfH1.length > 0) {
      for (const h1 of listOfH1) {
        if (wordExists(h1.textContent || '', this.keyword)) {
          message.score = 14
          message.text = `Focus keyword "${this.keyword}" is used in the H1`
          message.status = 'perfect'
          break
        }
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkFirstParagraphContainsKeyword() {
    const firstParagraph = this.domContent.window.document.querySelector('p')

    const message = new AtomicChecker(
      'FIRST_PARAGRAPH_CONTAINS_KEYWORD',
      `The focus keyword "${this.keyword}" doesn't appear in first paragraph of the text`
    )

    if (
      firstParagraph &&
      wordExists(firstParagraph.textContent || '', this.keyword)
    ) {
      message.score = 5
      message.text = `The focus keyword "${this.keyword}" is used in the first paragraph of the text`
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkDensity() {
    const message = new AtomicChecker(
      'DENSITY',
      `You should use the focus keyword keyword ${this.keyword} more often, to improve the keyword density (0%)`
    )

    const [densityResult, keywordFound] = getDensity(
      this.contentText,
      this.keyword
    )

    if (densityResult > 0) {
      message.score = 20
      message.text = `Your keyword density (${densityResult}%) is pretty perfect, focus keyword "ASD" used ${keywordFound} time(s)`
      message.status = 'perfect'
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }

  private checkLinkExists() {
    const aTags = this.domContent.window.document.getElementsByTagName('a')
    const message = new AtomicChecker(
      'LINK_EXISTS',
      `Add relevant links to improve user experience and internal link structure`
    )

    if (aTags.length > 0) {
      message.text = `You've added ${aTags.length} link(s) to the document`
      message.status = 'perfect'
      message.score = 10
    }
    this.score += message.score

    this.messages.push(message.getResult())
  }

  private checkImageExists() {
    const imageTags =
      this.domContent.window.document.getElementsByTagName('img')
    const message = new AtomicChecker('IMG_EXISTS', `You should add an image`)

    if (imageTags.length > 0) {
      message.text = `You've added an image`
      message.status = 'perfect'
      message.score = 5
    }
    this.score += message.score

    this.messages.push(message.getResult())
  }

  private checkImageAltContainsKeword() {
    const listOfImg =
      this.domContent.window.document.getElementsByTagName('img')

    const message = new AtomicChecker(
      'IMG_ALT_USE_KEYWORD',
      `The focus keyword "${this.keyword}" doesn't appear in the image Alt tag`
    )

    if (listOfImg.length > 0) {
      for (const img of listOfImg) {
        if (img.alt && wordExists(img.alt, this.keyword)) {
          message.score = 5
          message.text = `You've used the focus keyword "${this.keyword}" in the alt tag of an image `
          message.status = 'perfect'
          break
        }
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
  private checkImageTitleContainsKeword() {
    const listOfImg =
      this.domContent.window.document.getElementsByTagName('img')

    const message = new AtomicChecker(
      'IMG_TITLE_USE_KEYWORD',
      `The focus keyword "${this.keyword}" doesn't appear in the image Title tag`
    )

    if (listOfImg.length > 0) {
      for (const img of listOfImg) {
        if (img.title && wordExists(img.title, this.keyword)) {
          message.score = 5
          message.text = `You've used the focus keyword "${this.keyword}" in the title tag of an image `
          message.status = 'perfect'
          break
        }
      }
    }

    this.score += message.score
    this.messages.push(message.getResult())
  }
}
