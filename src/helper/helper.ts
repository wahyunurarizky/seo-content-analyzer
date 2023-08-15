export const splitWords = (text: string): Array<string> => {
  text = text.replace(/(^\s*)|(\s*$)/gi, '') //exclude  start and end white-space
  text = text.replace(/\n/g, ' ')
  text = text.replace(/[ ]{2,}/gi, ' ') //2 or more space to 1
  return text.split(' ').filter((s) => !!s.trim())
}

export const countWords = (text: string): number => {
  return splitWords(text).length
}

export const getDensity = (
  text: string,
  keyword: string
): [result: number, keywordFound: number] => {
  const s = splitWords(text)

  const numOfKeyword = s.filter((d) => d === keyword).length

  return [Math.round((numOfKeyword * 100) / s.length), numOfKeyword]
}

export const countChar = (str: string): number => {
  return str.trim().length
}

export const wordExists = (
  text: string,
  keyword: string,
  firstNumChar?: number
): boolean => {
  text = text.toLowerCase()
  if (firstNumChar) {
    let i = firstNumChar - 1
    while (text[i] && text[i]?.trim()) {
      i++
    }
    return splitWords(text.slice(0, i)).includes(keyword)
  }
  return splitWords(text).includes(keyword)
}
