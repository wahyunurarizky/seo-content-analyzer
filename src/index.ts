import jsdom from 'jsdom'
const { JSDOM } = jsdom
import Calculation from './checker/calculation'
import { Param } from './types'

const SEOContentAnalyzer = (param: Param) => {
  return Calculation(
    param,
    new JSDOM(param.content.toLowerCase()).window.document
  )
}

export default SEOContentAnalyzer
