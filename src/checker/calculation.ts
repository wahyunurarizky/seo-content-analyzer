import { SectionScore } from './../checker/SectionChecker'
import { CheckContent } from './../checker/check-content'
import { countChar } from './../helper/helper'
import { CheckDescMeta } from './../checker/check-desc-meta'
import { CheckTitle } from './../checker/check-title'

export interface Param {
  keyword: string
  title: string
  descriptionMeta: string
  content: string
}

export interface SEOResponse {
  seoScore: number
  sectionScore: Array<SectionScore>
}

const keywordExist = (keyword: string): boolean => {
  return countChar(keyword) > 0
}

const Calculation = (
  { keyword, title, content, descriptionMeta }: Param,
  domDocument: Document
): SEOResponse => {
  if (!keywordExist(keyword)) {
    throw new Error('keyword must exist')
  }

  const contentScore = new CheckContent(
    // new DOMParser().parseFromString(content, 'text/html'),
    domDocument,
    content
  )
  const descMetaScore = new CheckDescMeta(descriptionMeta, keyword)
  const titleScore = new CheckTitle(title, keyword)

  const seoScore =
    contentScore.countScore(75) +
    titleScore.countScore(20) +
    descMetaScore.countScore(5)

  return {
    seoScore,
    sectionScore: [
      contentScore.getResult(),
      descMetaScore.getResult(),
      titleScore.getResult()
    ]
  }
}

export default Calculation
