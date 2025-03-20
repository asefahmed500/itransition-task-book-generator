"use client"

import type React from "react"
import { RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

interface ControlPanelProps {
  language: string
  setLanguage: (language: string) => void
  seed: number
  setSeed: (seed: number) => void
  likes: number
  setLikes: (likes: number) => void
  reviews: number
  setReviews: (reviews: number) => void
  onRandomSeed: () => void
}

export function ControlPanel({
  language,
  setLanguage,
  seed,
  setSeed,
  likes,
  setLikes,
  reviews,
  setReviews,
  onRandomSeed,
}: ControlPanelProps) {
  const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value)) {
      setSeed(value)
    } else {
      setSeed(0)
    }
  }

  const handleReviewsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setReviews(value)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="de-DE">German (Germany)</SelectItem>
                <SelectItem value="fr-FR">French (France)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Seed</label>
            <div className="flex">
              <Input type="number" value={seed} onChange={handleSeedChange} className="rounded-r-none" />
              <Button variant="outline" size="icon" onClick={onRandomSeed} className="rounded-l-none border-l-0">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <label className="text-sm font-medium">Likes</label>
            <Slider value={[likes]} min={0} max={10} step={0.1} onValueChange={(value) => setLikes(value[0])} />
            <div className="text-center text-sm">{likes.toFixed(1)}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Review</label>
            <Input type="number" value={reviews} onChange={handleReviewsChange} step={0.1} min={0} max={10} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

