# Find Hip-Hop App

[The Find Hip-Hop App](https://github.com/flashgoodenpro/find-hip-hop-app) is an interactive map application that allows users to explore hip-hop artists geographically. I'm building this application as a project for a non-profit called [Soul Food Cypher](https://www.soulfoodcypher.com/), which aims to change communities by using positive lyricism and freestyle. Users can click on different regions of a map to discover artists associated with those areas. Clicking on an artist icon or marker opens a profile page with information about the artist, including their bio, popular tracks, and links to streaming platforms.

## Features

- **Interactive Map:**

  - Display a map of the United States with clickable regions.
  - Markers/icons for artists based on their associated cities or states.
  - Zoom functionality to explore regions in detail.

- **Artist Profiles:**

  - Each artist has a profile page with the following:
    - Bio and background information.
    - Embedded music (e.g., Spotify or YouTube links).
    - Social media links.
    - Tour dates or upcoming events.

- **Data Integration:**

  - Fetch artist and location data from a database or API.
  - Support for filtering artists by genre, region, or popularity.

- **Dynamic Popups:**

  - Clicking on a map marker opens a popup with the artist's name, photo, and a brief description.
  - The popup includes a link to the artist's full profile page.

- **User-Generated Content:**

  - Allow users to suggest new artists or update existing profiles (optional stretch feature).

- **Modern UI/UX:**
  - Responsive design to work on web, mobile, and tablet devices.
  - Intuitive and visually appealing layout.

## Tech Stack

- **Frontend:** React with Google Maps API for the interactive map.
- **Backend:** Ruby on Rails in API mode
- **Database:** Ruby on Rails using PostgreSQL
- **Additional Libraries:** Next.js, React Router for navigation, Axios for API requests, and styled-components for UI design.

## Getting Started

First, clone the repository:

```bash
git clone <repository-url>
cd find-hip-hop-app
```

Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Create a `.env.local` file in the root of your project and add your Google Maps API key:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
