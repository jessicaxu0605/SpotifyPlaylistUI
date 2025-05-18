# Spotify Playlist Viewer

A React-based web application for displaying and managing music playlists. This project provides a clean, sortable table interface for viewing playlist tracks with features like sorting by track name, artist, album, and duration.

## Features

- 📊 Sortable table view for playlist tracks
- 🎵 Display track information including name, artist, album, and duration
- ↕️ Ascending/descending sort functionality for all columns
- 📱 Responsive design with truncated text for better mobile viewing
- 🎨 Material-UI components for a modern look and feel

## Getting Started

### Prerequisites

- Node.js (version 14.0.0 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jessicaxu0605/SpotifyPlaylistUI
cd moonarch-takehome
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will open in your default browser at `http://localhost:5173`.

## Usage

The table view component provides the following functionality:

- Click on column headers to sort tracks
- Automatic truncation of long text with ellipsis
- Human-readable duration format (mm:ss)
- Multi-artist support with comma separation

## Technologies Used

- React
- Material-UI
