import { SectionMessage, SectionScore, statusMessage } from '../types'

export class SectionChecker implements SectionScore {
  public name: string
  public score: number
  public messages: SectionMessage[]
  protected text: string
  protected keyword: string

  constructor(name: string, text: string, keyword: string) {
    this.name = name
    this.text = text.toLowerCase()
    this.keyword = keyword.toLowerCase()
    this.score = 0
    this.messages = []
  }

  getResult(): SectionScore {
    return {
      name: this.name,
      score: this.score,
      messages: this.messages
    }
  }

  countScore(percentage: number) {
    return Math.round((this.score * percentage) / 100)
  }
}

export class AtomicChecker implements SectionMessage {
  public score: number
  public status: statusMessage

  constructor(public code: string, public text: string = 'Bad text') {
    this.score = 0
    this.status = 'bad'
  }

  getResult(): SectionMessage {
    return {
      code: this.code,
      score: this.score,
      status: this.status,
      text: this.text
    }
  }
}
