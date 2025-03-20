"use client"

import { LayoutGrid, LayoutList } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewToggleProps {
  view: "table" | "gallery"
  setView: (view: "table" | "gallery") => void
}

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={view === "table" ? "default" : "outline"}
        size="icon"
        onClick={() => setView("table")}
        aria-label="Table view"
      >
        <LayoutList className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "gallery" ? "default" : "outline"}
        size="icon"
        onClick={() => setView("gallery")}
        aria-label="Gallery view"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  )
}

