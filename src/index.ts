import jsdom from 'jsdom'
const { JSDOM } = jsdom
import Calculation from './checker/calculation'
import { Locale, Param } from './types'
import setLocale from './lang'

const SEOContentAnalyzer = (param: Param, locale: Locale = 'en') => {
  const { t } = setLocale(locale)

  return Calculation(
    param,
    new JSDOM(param.content.toLowerCase()).window.document,
    t
  )
}

export default SEOContentAnalyzer
