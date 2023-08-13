import jsdom from 'jsdom'
const { JSDOM } = jsdom
import Calculation from './checker/calculation'
import { Param } from './types'

const SEOContentAnalyzer = (param: Param) => {
  return Calculation(param, new JSDOM(param.content).window.document)
}

export default SEOContentAnalyzer
