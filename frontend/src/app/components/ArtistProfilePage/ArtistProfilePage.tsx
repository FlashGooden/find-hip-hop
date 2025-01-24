import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './ArtistProfilePage.module.css';

interface Artist {
  id: string;
  name: string;
  bio?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    spotify?: string;
    youtube?: string;
  };
}

interface ArtistProfilePageProps {
  currentArtist: Artist;
  match?: {
    params: {
      id: string;
    };
  };
}

const ArtistProfilePage: React.FC<ArtistProfilePageProps> = ({ match, currentArtist }) => {
  const [artist, setArtist] = useState<Artist | null>(currentArtist);
  // const artistId = match.params.id;

  // useEffect(() => {
  //   axios
  //     .get(`/api/artists/${artistId}`)
  //     .then((response) => setArtist(response.data))
  //     .catch((error) => console.error("Error fetching artist data:", error));
  // }, [artistId]);


  if (!artist) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.artistName}>{artist.name}</h1>
      <p className={styles.bio}>{artist.bio}</p>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Popular Tracks</h2>
        {/* Embed music links */}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Social Media</h2>
        {artist.socialMedia && (
          <div className={styles.socialLinks}>
            {artist.socialMedia.instagram && (
              <a href={`https://instagram.com/${artist.socialMedia.instagram}`}
                 className={styles.socialLink}
                 target="_blank"
                 rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {artist.socialMedia.twitter && (
              <a href={`https://twitter.com/${artist.socialMedia.twitter}`}
                 className={styles.socialLink}
                 target="_blank"
                 rel="noopener noreferrer">
                Twitter
              </a>
            )}
            {artist.socialMedia.spotify && (
              <a href={`https://open.spotify.com/${artist.socialMedia.spotify}`}
                 className={styles.socialLink}
                 target="_blank"
                 rel="noopener noreferrer">
                Spotify
              </a>
            )}
            {artist.socialMedia.youtube && (
              <a href={`https://youtube.com/${artist.socialMedia.youtube}`}
                 className={styles.socialLink}
                 target="_blank"
                 rel="noopener noreferrer">
                YouTube
              </a>
            )}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tour Dates</h2>
        {/* Tour dates */}
      </div>

      <div className={`${styles.section} ${styles.wikipedia}`}>
        <h2 className={styles.sectionTitle}>Wikipedia</h2>
        {/* Wikipedia excerpt about the artist */}
      </div>
    </div>
  );
};

export default ArtistProfilePage;
