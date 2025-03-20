"use client"

import { useState, useEffect, useRef } from "react"
import { BookTable } from "@/components/book-table"
import { ControlPanel } from "@/components/control-panel"
import { ViewToggle } from "@/components/view-toggle"
import { BookGallery } from "@/components/book-gallery"
import { generateBooks } from "@/lib/actions"
import type { Book } from "@/lib/types"
import { ExportCSV } from "@/components/export-csv"

export default function Home() {
  const [language, setLanguage] = useState<string>("en-US")
  const [seed, setSeed] = useState<number>(Math.floor(Math.random() * 1000000))
  const [likes, setLikes] = useState<number>(3.5)
  const [reviews, setReviews] = useState<number>(2.0)
  const [books, setBooks] = useState<Book[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [view, setView] = useState<"table" | "gallery">("table")

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const fetchBooks = async (reset = false) => {
    setLoading(true)
    const newPage = reset ? 1 : page
    const result = await generateBooks({
      language,
      seed,
      likes,
      reviews,
      page: newPage,
      limit: reset ? 20 : 10,
    })

    if (reset) {
      setBooks(result)
      setPage(1)
    } else {
      setBooks([...books, ...result])
      setPage(page + 1)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBooks(true)
  }, [language, seed, likes, reviews])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchBooks()
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [books, loading])

  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000))
  }

  return (
    <main className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Book Store Testing Generator</h1>

      <div className="mb-6">
        <ControlPanel
          language={language}
          setLanguage={setLanguage}
          seed={seed}
          setSeed={setSeed}
          likes={likes}
          setLikes={setLikes}
          reviews={reviews}
          setReviews={setReviews}
          onRandomSeed={handleRandomSeed}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <ViewToggle view={view} setView={setView} />
        <ExportCSV books={books} />
      </div>

      {view === "table" ? <BookTable books={books} /> : <BookGallery books={books} />}

      <div ref={loadMoreRef} className="h-10 flex justify-center items-center my-4">
        {loading && <div className="loader">Loading...</div>}
      </div>
    </main>
  )
}

