"use server"

import type { Book, GenerateBooksParams, Review } from "./types"

// Array of realistic book cover images
const bookCovers = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603284569248-821525309698?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=300&auto=format&fit=crop",
]

// Function to get a deterministic book cover based on seed
function getBookCover(seed: number): string {
  // Use the seed to deterministically select a cover
  const index = seed % bookCovers.length
  return bookCovers[index]
}

export async function generateBooks({
  language,
  seed,
  likes,
  reviews,
  page,
  limit,
}: GenerateBooksParams): Promise<Book[]> {
  // Set the seed based on the provided seed and page number
  const combinedSeed = seed + page

  // Set the locale based on the language
  // Initialize faker with the correct locale
  let fakerInstance
  switch (language) {
    case "de-DE":
      fakerInstance = await import("@faker-js/faker/locale/de")
      break
    case "fr-FR":
      fakerInstance = await import("@faker-js/faker/locale/fr")
      break
    case "en-US":
    default:
      fakerInstance = await import("@faker-js/faker/locale/en")
      break
  }

  // Use the imported faker instance
  const { faker } = fakerInstance

  // Set the seed for deterministic generation
  faker.seed(combinedSeed)

  // Generate the books
  const books: Book[] = []

  const startIndex = (page - 1) * (page === 1 ? 20 : 10)
  const endIndex = startIndex + limit

  for (let i = startIndex; i < endIndex; i++) {
    // Generate a deterministic random seed for this specific book
    const bookSeed = combinedSeed * 1000 + i
    faker.seed(bookSeed)

    // Generate ISBN (format: 978-X-XX-XXXXXX-X)
    const isbn = `978-${faker.number.int({ min: 0, max: 9 })}-${faker.number.int({ min: 10, max: 99 })}-${faker.number.int({ min: 100000, max: 999999 })}-${faker.number.int({ min: 0, max: 9 })}`

    // Generate title based on language
    let title
    if (language === "en-US") {
      title = faker.commerce.productName()
    } else if (language === "de-DE") {
      title = `${faker.word.adjective()} ${faker.word.noun()}`
    } else if (language === "fr-FR") {
      title = `Le ${faker.word.adjective()} ${faker.word.noun()}`
    }

    // Generate 1-2 authors
    const authorCount = faker.number.int({ min: 1, max: 2 })
    const authors = Array.from({ length: authorCount }, () => `${faker.person.firstName()} ${faker.person.lastName()}`)

    // Generate publisher and year
    const publisher = `${faker.company.name()}, ${faker.number.int({ min: 2000, max: 2024 })}`
    const publishYear = faker.number.int({ min: 2000, max: 2024 })

    // Generate likes based on the average likes parameter
    // If likes is 3.5, each book will have around 3-4 likes
    const actualLikes = Math.round(faker.number.float({ min: likes * 0.7, max: likes * 1.3, precision: 0.01 }))

    // Generate reviews based on the average reviews parameter
    // If reviews is 0.5, each book has a 50% chance of having 1 review
    const reviewCount = Math.floor(reviews)
    const hasExtraReview = faker.number.float() < reviews - reviewCount
    const actualReviewCount = reviewCount + (hasExtraReview ? 1 : 0)

    const bookReviews: Review[] = Array.from({ length: actualReviewCount }, () => {
      const company = faker.company.name()
      return {
        text: faker.lorem.paragraph(),
        author: `${faker.person.firstName()} ${faker.person.lastName()}`,
        company,
      }
    })

    // Get a deterministic book cover based on the book seed
    const coverUrl = getBookCover(bookSeed)

    books.push({
      isbn,
      title: title || "Untitled Book",
      authors,
      publisher,
      publishYear,
      likes: actualLikes,
      reviews: bookReviews,
      coverUrl, // Add the cover URL
    })
  }

  return books
}

