import Calculation, { Param } from '../checker/calculation'

const SEOContentAnalyzer = (param: Param) => {
  return Calculation(
    param,
    new DOMParser().parseFromString(param.content, 'text/html')
  )
}

export default SEOContentAnalyzer
