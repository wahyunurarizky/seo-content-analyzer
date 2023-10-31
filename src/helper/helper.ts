import * as enpos from 'en-pos'
const Tag = enpos.Tag

export const splitWords = (text: string): Array<string> => {
  text = text.replace(/(^\s*)|(\s*$)/gi, '') //exclude  start and end white-space
  text = text.replace(/\n/g, ' ')
  text = text.replace(/[ ]{2,}/gi, ' ') //2 or more space to 1
  return text.split(' ').filter((s) => !!s.trim())
}

export const splitSentences = (text: string): string[] => {
  const regex = /(?<![A-Z].)[.?!;:\n]\s+/
  let sentences: string[] = text.split(regex);
  sentences.forEach((sentence, index) => {
    sentences[index] = sentence.replace(/(\.|\?|\!)+$/g, '') // Remove trailing punctuation if present
  })
  return sentences;
}

export const countWords = (text: string): number => {
  return splitWords(text).length
}

export const countSentences = (text: string): number => {
  return splitSentences(text).length
}

export const getDensity = (
  text: string,
  keyword: string
): [result: number, keywordFound: number] => {
  const s = splitWords(text)
  if (s.length <= 0 || !keyword) return [0, 0]

  const numOfKeyword = text.match(new RegExp(keyword, 'g'))?.length || 0

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
  const arrKeyword = splitWords(keyword.toLowerCase())
  if (firstNumChar) {
    let i = firstNumChar - 1
    while (text[i] && text[i]?.trim()) {
      i++
    }
    return (
      arrKeyword.length > 0 &&
      arrKeyword.every((k) => splitWords(text.slice(0, i)).includes(k))
    )
  }
  return (
    arrKeyword.length > 0 &&
    arrKeyword.every((k) => splitWords(text).includes(k))
  )
}

export const insertText = (
  text: string,
  index: number,
  addText: string
): string => {
  return text.slice(0, index) + addText + text.slice(index)
}

export const removeCharOfString = (
  text: string,
  bottomIndex: number,
  topIndex: number
): string => {
  return text.slice(0, bottomIndex) + text.slice(topIndex + 1)
}

export const countSyllables = (word: string): number => {
  let count: number = 0;
  let vowels: string = "aeiouy"
  word = word.toLowerCase();
  if (vowels.includes(word.charAt(0))) {
    count += 1;
  }
  for (let index = 0; index < word.length; index++) {
    if (vowels.includes(word.charAt(index)) && !vowels.includes(word.charAt(index-1))) {
      count += 1;
    }
  }
  if (word.slice(-1) === "e") {
    count -= 1;
  }
  if (count == 0) {
    count += 1;
  }

  return count;
}
export const fleshReadingScore = (text: string): number => {
  const base = 206.835
  const firstParam = 1.015
  const secondParam = 84.6
  const totalWords = countWords(text)
  const totalSentences = countSentences(text)
  const totalSyllables = countSyllables(text)

  
  if (totalSentences !== 0 && totalWords !== 0 && totalSyllables !== 0) {
    return Math.round(
      base - 
      firstParam * (totalWords / totalSentences) - 
      secondParam * (totalSyllables / totalWords)
      )
  } else {
    return 0
  }
}

export const longSectionExists = (elements: Array<Element>): boolean => {
  let longSectionExists: boolean = false
  let sectionLength: number = 0

  elements.forEach((element) => {
    if (element.tagName.startsWith('H')) {
      sectionLength = 0
    } else {
      const elementText = element.textContent || ''
      sectionLength += countWords(elementText)
    }
    
    if (sectionLength > 300) {
      longSectionExists = true
    }
  })
  return longSectionExists;
}
  
export const usingPassiveVoice = (text: string) => {
  console.log(text)
  const passiveTensePatterns = [
    ['VBZ', 'VBN'],
    ['VBP', 'VBN'],
    ['VBZ', 'VBG', 'VBN'],
    ['VBP', 'VBG', 'VBN'],
    ['VBD', 'VBN'],
    ['VBD', 'VBG', 'VBN'],
    ['VBZ', 'VBN', 'VBN'],
    ['VBP', 'VBN', 'VBN'],
    ['VBD', 'VBN', 'VBN'],
    ['MD', 'VB', 'VBN'],
    ['MD', 'VB', 'VBN', 'VBN'],
    ['VBZ', 'RB', 'VBN'],
    ['VBP', 'RB', 'VBN'],
    ['VBZ', 'RB', 'VBG', 'VBN'],
    ['VBP', 'RB', 'VBG', 'VBN'],
    ['VBD', 'RB', 'VBN'],
    ['VBD', 'RB', 'VBG', 'VBN'],
    ['VBZ', 'RB', 'VBN', 'VBN'],
    ['VBP', 'RB', 'VBN', 'VBN'],
    ['VBD', 'RB', 'VBN', 'VBN'],
    ['MD', 'RB', 'VB', 'VBN'],
    ['MD', 'RB', 'VB', 'VBN', 'VBN'],
    ['TO', 'VB', 'VBN']
  ]

  let passiveVoice: boolean = false
  let words: Array<string> = splitWords(text)
  var tags = new Tag(words)
    .initial() 
    .smooth()
    .tags;

    console.log(tags)
  let indexOfPattern: number
  passiveTensePatterns.forEach((pattern) => {
    for (let indexOfTags = 0; indexOfTags < tags.length-pattern.length+1; indexOfTags++) {
      indexOfPattern = 0
      while (tags[indexOfTags+indexOfPattern] == pattern[indexOfPattern] && indexOfPattern < pattern.length) {
        // Discarding the most probable false positives
        if (
          (pattern[indexOfPattern] == 'VBP' || pattern[indexOfPattern] == 'VB') 
          && 
          (words[indexOfTags+indexOfPattern] == 'have' || words[indexOfTags+indexOfPattern] == 'has')
          ) {
            console.log('inside if')
            break
          }
        // console.log('indexOfPattern : ' + indexOfPattern)
        if (indexOfPattern == pattern.length-1) {
          // console.log('indexOfPattern == pattern.length')
          passiveVoice = true
        }
        indexOfPattern++
      }
      if (passiveVoice) {
        break
      }
    }
  })
  return passiveVoice
}