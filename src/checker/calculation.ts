import { CheckContent } from './../checker/check-content'
import { countChar } from './../helper/helper'
import { CheckDescMeta } from './../checker/check-desc-meta'
import { CheckTitle } from './../checker/check-title'
import { Param, SEOResponse } from '../types'

const Calculation = (
  { keyword, title, content, descriptionMeta }: Param,
  domDocument: Document
): SEOResponse => {
  const contentScore = new CheckContent(
    // new DOMParser().parseFromString(content, 'text/html'),
    domDocument,
    keyword
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
