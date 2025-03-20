"use client"

import React from "react"

import { useState } from "react"
import type { Book } from "@/lib/types"
import { ChevronDown, ChevronUp } from "lucide-react"
import { BookDetails } from "./book-details"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BookTableProps {
  books: Book[]
}

export function BookTable({ books }: BookTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(null)
    } else {
      setExpandedRow(index)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead className="w-40">ISBN</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author(s)</TableHead>
            <TableHead>Publisher</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book, index) => (
            <React.Fragment key={index}>
              <TableRow
                className={`cursor-pointer hover:bg-muted/50 ${expandedRow === index ? "bg-blue-50 dark:bg-blue-900/20" : index % 2 === 0 ? "bg-muted/30" : ""}`}
                onClick={() => toggleRow(index)}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.authors.join(", ")}</TableCell>
                <TableCell>{book.publisher}</TableCell>
                <TableCell className="w-8">
                  {expandedRow === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </TableCell>
              </TableRow>
              {expandedRow === index && (
                <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                  <TableCell colSpan={6} className="p-0">
                    <BookDetails book={book} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

