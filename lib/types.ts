export interface Review {
  text: string
  author: string
  company?: string
}

export interface Book {
  isbn: string
  title: string
  authors: string[]
  publisher: string
  publishYear: number
  coverUrl?: string
  likes: number
  reviews: Review[]
}

export interface GenerateBooksParams {
  language: string
  seed: number
  likes: number
  reviews: number
  page: number
  limit: number
}

