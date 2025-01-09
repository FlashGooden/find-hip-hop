import React, { useEffect, useState } from "react";
import axios from "axios";

interface Artist {
  id: string;
  name: string;
  bio: string;
}

interface ArtistProfilePageProps {
  match: {
    params: {
      id: string;
    };
  };
}

const ArtistProfilePage: React.FC<ArtistProfilePageProps> = ({ match }) => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const artistId = match.params.id;

  useEffect(() => {
    axios
      .get(`/api/artists/${artistId}`)
      .then((response) => setArtist(response.data))
      .catch((error) => console.error("Error fetching artist data:", error));
  }, [artistId]);

  if (!artist) return <div>Loading...</div>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>{artist.bio}</p>
      <div>
        <h2>Popular Tracks</h2>
        {/* Embed music links */}
      </div>
      <div>
        <h2>Social Media</h2>
        {/* Social media links */}
      </div>
      <div>
        <h2>Tour Dates</h2>
        {/* Tour dates */}
      </div>
    </div>
  );
};

export default ArtistProfilePage;
