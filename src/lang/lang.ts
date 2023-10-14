const lang: Record<string, any> = {
  en: {
    TITLE_LENGTH: {
      short:
        'The Page title is too short, ?? characters available. (?? of ?? characters used)',
      long: 'The Page title is too long, ?? characters available. (?? of ?? characters used)',
      perfect:
        'The Page title is too perfect, ?? characters available. (?? of ?? characters used)'
    },
    TITLE_USE_KEYWORD: {
      not_used: 'The focus keyword "??" doesn\'t appear in the Page title',
      used: 'The focus keyword "??" is used in the Page title'
    },
    TITLE_USE_KEYWORD_ON_BEGINNING: {
      not_used: 'Put the focus keyword at the beginning of the Page Title',
      used: 'The focus keyword "??" is used at the beginning of the Page Title'
    },
    DESC_META_LENGTH: {
      short:
        'The Meta description is too short, ?? characters available. (?? of ?? characters used)',
      long: 'The Meta description is too long, ?? characters available. (?? of ?? characters used)',
      perfect:
        'The Meta description perfect, ?? characters available. (?? of ?? characters used)'
    },
    DESC_META_USE_KEYWORD: {
      not_used:
        'The focus keyword "??" doesn\'t appear in the Meta description',
      used: 'The focus keyword "??" is used in the Meta description'
    },
    CONTENT_MINIMUM_WORDS: {
      short:
        "Your text doesn't contain enough words, a minimum of ?? words is recommended",
      good: 'Your text contains (??) words',
      perfect: 'Your text contains (??) words'
    },
    H1_EXIST: {
      not_exists: 'You should add a H1',
      exists: "You've added a H1"
    },
    H1_USE_KEYWORD: {
      not_used: 'The focus keyword "??" doesn\'t appear in the H1',
      used: 'The focus keyword "??" is used in the H1'
    },
    FIRST_PARAGRAPH_CONTAINS_KEYWORD: {
      not_used:
        'The focus keyword "??" doesn\'t appear in first paragraph of the text',
      used: 'The focus keyword "??" is used in first paragraph of the text'
    },
    DENSITY: {
      bad: 'You should use the focus keyword ?? more often, to improve the keyword density (0%)',
      perfect:
        'Your keyword density (??%) is pretty perfect, focus keyword ?? used ?? time(s)'
    },
    LINK_EXISTS: {
      not_exists:
        'Add relevant links to improve user experience and internal link structure',
      exists: "You've added ?? link(s) to the document"
    },
    IMG_EXISTS: {
      not_exists: 'You should add an image',
      exists: "You've added an image"
    },
    IMG_ALT_USE_KEYWORD: {
      not_used: 'The focus keyword "??" doesn\'t appear in the image alt tag',
      used: 'The focus keyword "??" is used in the image alt tag'
    },
    IMG_TITLE_USE_KEYWORD: {
      not_used: 'The focus keyword "??" doesn\'t appear in the image title tag',
      used: 'The focus keyword "??" is used in the image title tag'
    },
    SENTENCES_LENGTH: {
      long: '??% of sentences contain more than 20 words, which is more than the maximum recommended value of 10%',
      good: '??% of sentences contain more than 20 words, which is a little bit more than the maximum recommended value of 10%',
      perfect: 'Only ??% of sentences contain more than 20 words, which is perfect'
    }
  },
  id: {
    TITLE_LENGTH: {
      short:
        'Judul terlalu pendek, ?? karakter tersedia. (?? dari ?? karakter digunakan)',
      long: 'Judul terlalu panjang, ?? karakter tersedia. (?? dari ?? karakter digunakan)',
      perfect:
        'Judul sempurna, ?? karakter tersedia. (?? dari ?? karakter digunakan)'
    },
    TITLE_USE_KEYWORD: {
      not_used: 'Fokus keyword "??" tidak muncul pada judul',
      used: 'Fokus keyword "??" muncul pada judul'
    },
    TITLE_USE_KEYWORD_ON_BEGINNING: {
      not_used: 'Fokus keyword tidak ada pada awalan judul',
      used: 'Fokus keyword "??" digunakan di awalan judul'
    },
    DESC_META_LENGTH: {
      short:
        'deskripsi meta terlalu pendek, ?? karakter tersedia. (?? dari ?? karakter digunakan)',
      long: 'deskripsi meta terlalu panjang, ?? karakter tersedia. (?? dari ?? karakter digunakan)',
      perfect:
        'deskripsi meta sempurna, ?? karakter tersedia. (?? dari ?? karakter digunakan)'
    },
    DESC_META_USE_KEYWORD: {
      not_used: 'Fokus keyword "??" tidak ada pada Meta deskripsi',
      used: 'Fokus keyword "??" digunakan pada Meta deskripsi'
    },
    CONTENT_MINIMUM_WORDS: {
      short:
        'Teks konten tidak memiliki cukup kata, minimum ?? kata yang direkomendasikan',
      good: 'teks mu mengandung (??) words',
      perfect: 'teks mu mengandung (??) words'
    },
    H1_EXIST: {
      not_exists: 'Tidak ada H1',
      exists: 'Terdapat H1'
    },
    H1_USE_KEYWORD: {
      not_used: 'Fokus keyword "??" tidak ada pada H1',
      used: 'Fokus keyword "??" digunakan pada H1'
    },
    FIRST_PARAGRAPH_CONTAINS_KEYWORD: {
      not_used: 'Fokus keyword "??" tidak ada pada paragraph pertama',
      used: 'Fokus keyword "??" digunakan pada paragraph pertama'
    },
    DENSITY: {
      bad: 'Gunakan fokus keyword "??" lebih sering, untuk meningkatkan kepadatan keyword (0%)',
      perfect:
        'Kepadatan keyword (??%) bagus, Fokus keyword "??" digunakan ?? time(s)'
    },
    LINK_EXISTS: {
      not_exists:
        'Tambahkan tautan yg relevan untuk meningkatkan user experience',
      exists: '?? Tautan ditambakan ke dokumen'
    },
    IMG_EXISTS: {
      not_exists: 'Tidak ada Gambar',
      exists: 'Terdapat Gambar'
    },
    IMG_ALT_USE_KEYWORD: {
      not_used: 'Fokus keyword "??" tidak ada pada gambar alt tag',
      used: 'Fokus keyword "??" digunakan pada gambar alt tag'
    },
    IMG_TITLE_USE_KEYWORD: {
      not_used: 'Fokus keyword "??" tidak ada pada gambar title tag',
      used: 'Fokus keyword "??" digunakan pada gambar title tag'
    },
    SENTENCES_LENGTH: {
      long: '??% kalimat mengandung lebih dari 20 kata, yang melebihi nilai maksimum yang disarankan sebesar 10%',
      good: '??% kalimat mengandung lebih dari 20 kata, yang sedikit lebih banyak dari nilai maksimum yang disarankan yaitu 10%',
      perfect: 'Hanya ??% kalimat yang mengandung lebih dari 20 kata, itu sempurna'
    }
  }
}

export default lang
