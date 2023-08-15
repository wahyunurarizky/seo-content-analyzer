import Calculation from '../checker/calculation'
import { Param } from '../types'

const SEOContentAnalyzer = (param: Param) => {
  return Calculation(
    param,
    new DOMParser().parseFromString(param.content.toLowerCase(), 'text/html')
  )
}

export default SEOContentAnalyzer
