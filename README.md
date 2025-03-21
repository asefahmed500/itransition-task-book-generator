# Book Store Testing Generator

A web application for generating fake book data to test book store applications. This tool allows users to customize parameters and generate realistic book data in different languages.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Libraries and Dependencies](#libraries-and-dependencies)
- [Component Breakdown](#component-breakdown)
- [Data Generation Logic](#data-generation-logic)
- [How to Run Locally](#how-to-run-locally)
- [Usage Guide](#usage-guide)

## Overview

This application generates realistic book data for testing purposes. Users can select language/region, set a seed value, and specify the average number of likes and reviews per book. The application then generates book records with titles, authors, ISBNs, and publishers that match the selected language.

## Features

- **Language/Region Selection**: Choose between English (US), German (Germany), and French (France)
- **Seed Control**: Set a specific seed or generate a random one (same seed always produces the same data)
- **Customizable Parameters**:
  - Average likes per book (0-10 with decimal precision)
  - Average reviews per book (with decimal precision)
- **Dynamic Data Generation**: Table updates automatically when parameters change
- **Infinite Scrolling**: Initially shows 20 records, loads 10 more when scrolling down
- **Expandable Records**: Click on a row to see detailed information including:
  - Book cover image
  - Full title and author information
  - Reviews with author names
  - Like count
- **Export to CSV**: Download the current data as a CSV file
- **Gallery View**: Alternative visual representation of the books

## Architecture

The application is built using Next.js with the App Router and follows a client-server architecture:

1. **Client-Side**: 
   - React components for UI rendering
   - State management for user inputs
   - Infinite scrolling implementation
   - View toggling between table and gallery

2. **Server-Side**:
   - Server actions for data generation
   - Deterministic random data generation based on seed
   - Language-specific content generation

3. **Data Flow**:
   - User selects parameters (language, seed, likes, reviews)
   - Client sends request to server action
   - Server generates data based on parameters
   - Client displays the data and handles pagination

## Libraries and Dependencies

| Library | Purpose |
|---------|---------|
| **Next.js** | React framework for server-side rendering and API routes |
| **React** | UI library for building component-based interfaces |
| **@faker-js/faker** | Generates realistic fake data in multiple languages |
| **shadcn/ui** | UI component library based on Radix UI and Tailwind CSS |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Lucide React** | Icon library for UI elements |
| **PapaParse** | CSV parsing and generation for the export feature |
| **next-themes** | Theme management for light/dark mode support |

## Component Breakdown

### Main Components

#### `app/page.tsx`
The main page component that orchestrates the application. It:
- Manages state for language, seed, likes, reviews
- Handles data fetching via server actions
- Implements infinite scrolling
- Toggles between table and gallery views

#### `components/control-panel.tsx`
The control panel for user inputs:
- Language selector dropdown
- Seed input with random seed button
- Likes slider (0-10)
- Reviews input field

#### `components/book-table.tsx`
Displays books in a table format:
- Shows index, ISBN, title, authors, publisher
- Implements expandable rows
- Handles row selection

#### `components/book-details.tsx`
Shows detailed information about a selected book:
- Displays book cover with title overlay
- Shows full book information
- Lists all reviews with author information
- Shows like count

#### `components/book-gallery.tsx`
Alternative view showing books in a grid layout:
- Displays book covers in a card format
- Shows basic book information
- Opens detailed view in a dialog

#### `components/export-csv.tsx`
Handles CSV export functionality:
- Converts book data to CSV format
- Creates and triggers download

#### `components/view-toggle.tsx`
Toggles between table and gallery views:
- Button group for view selection
- Visual indication of current view

### Server Components

#### `lib/actions.ts`
Server action for generating book data:
- Handles locale-specific data generation
- Implements deterministic random generation based on seed
- Manages fractional likes and reviews logic
- Assigns book covers based on seed

### Utility Components

#### `lib/types.ts`
TypeScript interfaces for the application:
- Book interface
- Review interface
- Parameter interfaces

#### `lib/utils.ts`
Utility functions:
- Class name merging for Tailwind CSS
- Other helper functions

## Data Generation Logic

### Seed-Based Generation

The application uses a deterministic approach to data generation:
- The seed value is combined with the page number to create a unique seed for each batch
- This ensures that the same seed always produces the same data
- Different pages can be generated independently without regenerating previous pages

### Fractional Likes and Reviews

The application handles fractional values for likes and reviews:
- For likes: If average likes is 3.5, each book will have around 3-4 likes
- For reviews: If average reviews is 0.5, each book has a 50% chance of having 1 review

### Language-Specific Content

The application generates content based on the selected language:
- Uses Faker.js with the appropriate locale
- Titles, authors, and publishers match the selected language
- Different patterns for title generation based on language

### live link 

 https://book-store-generator.vercel.app

