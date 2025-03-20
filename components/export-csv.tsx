"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Book } from "@/lib/types"
import Papa from "papaparse"

interface ExportCSVProps {
  books: Book[]
}

export function ExportCSV({ books }: ExportCSVProps) {
  const handleExport = () => {
    const data = books.map((book, index) => ({
      Index: index + 1,
      ISBN: book.isbn,
      Title: book.title,
      Authors: book.authors.join(", "),
      Publisher: book.publisher,
      Likes: book.likes,
      Reviews: book.reviews.length,
    }))

    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `books-export-${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleExport} variant="outline" size="sm">
      <Download className="h-4 w-4 mr-2" />
      Export CSV
    </Button>
  )
}

