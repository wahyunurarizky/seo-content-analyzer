import { CheckContent } from './../checker/check-content'
import { CheckDescMeta } from './../checker/check-desc-meta'
import { CheckTitle } from './../checker/check-title'
import { Param, SEOResponse, getTranslation } from '../types'

const Calculation = (
  { keyword, title, descriptionMeta }: Param,
  domDocument: Document,
  t: getTranslation
): SEOResponse => {
  const contentScore = new CheckContent(domDocument, keyword, t)
  const descMetaScore = new CheckDescMeta(descriptionMeta, keyword, t)
  const titleScore = new CheckTitle(title, keyword, t)

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
