import jsdom from 'jsdom'
const { JSDOM } = jsdom
import Calculation, { Param } from './checker/calculation'

const SEOContentAnalyzer = (param: Param) => {
  return Calculation(param, new JSDOM(param.content).window.document)
}

export default SEOContentAnalyzer
