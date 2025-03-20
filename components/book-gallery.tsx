"use client"

import { useState } from "react"
import type { Book } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { BookDetails } from "./book-details"

interface BookGalleryProps {
  books: Book[]
}

export function BookGallery({ books }: BookGalleryProps) {
  const [openBook, setOpenBook] = useState<Book | null>(null)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {books.map((book, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <div className="aspect-[2/3] bg-gray-200 relative">
                {book.coverUrl ? (
                  <div className="relative h-full w-full">
                    <img
                      src={book.coverUrl || "/placeholder.svg"}
                      alt={book.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 flex flex-col items-center justify-end p-4 text-white">
                      <div className="text-sm font-bold text-center line-clamp-2">{book.title}</div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="text-sm font-bold line-clamp-3">{book.title}</div>
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm line-clamp-2">{book.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{book.authors.join(", ")}</p>
              </CardContent>
              <CardFooter className="p-3 pt-0 text-xs text-muted-foreground">{book.publisher}</CardFooter>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <BookDetails book={book} />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}

