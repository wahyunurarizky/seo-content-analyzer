import path from 'path'
import fs from 'fs'
import { Locale, getTranslation, statusMessage } from '../types'
import { insertText, removeCharOfString } from '../helper/helper'
import lang from './lang'

let defaultLang = lang['en']

const t: getTranslation = (key, status, ...props) => {
  let text = defaultLang[key][status]

  var regex = new RegExp('\\?\\?', 'g')
  let i = 0

  while (text?.search(regex) !== -1) {
    if (!props[i]) {
      break
    }
    const index = text?.search(regex)
    text = removeCharOfString(text, index, index + 1)
    text = insertText(text, index, props[i]?.toString() || '')
    i++
  }

  return text
}

const setLocale = (locale: Locale) => {
  defaultLang = lang[locale]

  return { t }
}

export default setLocale
