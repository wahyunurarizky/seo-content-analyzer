import Calculation from '../checker/calculation'
import setLocale from '../lang'
import { Locale, Param } from '../types'

const SEOContentAnalyzer = (param: Param, locale: Locale) => {
  const { t } = setLocale(locale)

  return Calculation(
    param,
    new DOMParser().parseFromString(param.content.toLowerCase(), 'text/html'),
    t
  )
}

export default SEOContentAnalyzer
