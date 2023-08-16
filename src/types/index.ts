export interface Param {
  keyword: string
  title: string
  descriptionMeta: string
  content: string
}

export interface SEOResponse {
  seoScore: number
  sectionScore: Array<SectionScore>
}

export type statusMessage = 'perfect' | 'good' | 'bad'

export interface SectionMessage {
  score: number
  code: string
  status: statusMessage
  text: string
}

export interface SectionScore {
  name: string
  score: number
  messages: Array<SectionMessage>
}

export type Locale = 'en' | 'id'

export type getTranslation = (
  key: string,
  status: string,
  ...props: (string | number)[]
) => string
