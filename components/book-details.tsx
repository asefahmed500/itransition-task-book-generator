"use client"

import type { Book } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp } from "lucide-react"

interface BookDetailsProps {
  book: Book
}

export function BookDetails({ book }: BookDetailsProps) {
  return (
    <div className="p-6 grid md:grid-cols-[200px_1fr] gap-6">
      <div className="relative">
        <div className="relative aspect-[2/3] bg-gray-200 rounded-md overflow-hidden shadow-md">
          {book.coverUrl ? (
            <div className="relative h-full w-full">
              <img src={book.coverUrl || "/placeholder.svg"} alt={book.title} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 flex flex-col items-center justify-end p-4 text-white">
                <div className="text-sm font-bold text-center line-clamp-2">{book.title}</div>
                <div className="text-xs mt-1 opacity-80">by {book.authors.join(", ")}</div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="text-lg font-bold">{book.title}</div>
              <div className="text-sm mt-2">by {book.authors.join(", ")}</div>
            </div>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1">
          <ThumbsUp className="h-4 w-4 text-blue-500" />
          <span>{book.likes}</span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-1">{book.title}</h3>
        <h4 className="text-md mb-3">by {book.authors.join(", ")}</h4>
        <div className="text-sm text-muted-foreground mb-2">{book.publisher}</div>

        {book.reviews.length > 0 ? (
          <div className="mt-4">
            <h5 className="font-semibold mb-2">Reviews</h5>
            <div className="space-y-3">
              {book.reviews.map((review, i) => (
                <Card key={i}>
                  <CardContent className="p-3">
                    <p className="italic text-sm">{review.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      — {review.author}, {review.company}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground mt-4">No reviews yet</div>
        )}
      </div>
    </div>
  )
}

