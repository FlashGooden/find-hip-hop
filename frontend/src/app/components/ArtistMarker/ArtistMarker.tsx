// components/ArtistMarker.tsx
import React from "react";
import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { Artist } from "../MapComponent/MapComponent";
import styles from './ArtistMarker.module.css';

interface ArtistMarkerProps {
  artist: Artist;
  onHover: (artist: Artist) => void;
  onHoverOut: () => void;
  image: string;
  zoomLevel: number;
  markerClickHandler: (artist: Artist) => void;
  hoveredArtist: Artist | null;
}

const ArtistMarker: React.FC<ArtistMarkerProps> = ({
  artist,
  onHover,
  onHoverOut,
  image,
  zoomLevel,
  markerClickHandler,
  hoveredArtist
}) => {
  const size = Math.max(20, Math.min(100, zoomLevel * 5));

  return (
    <AdvancedMarker
      position={{ lat: artist.latitude, lng: artist.longitude }}
      onMouseEnter={() => onHover(artist)}
      onMouseLeave={() => onHoverOut()}
      collisionBehavior="REQUIRED_AND_HIDES_OPTIONAL"
      onClick={() => markerClickHandler(artist)}
      zIndex={hoveredArtist?.id === artist.id ? 1000 : undefined}
    >
      <img src={`/${image}`} className={styles.marker} width={size} height={size} alt={artist.name} style={{ cursor: "pointer" }} />
    </AdvancedMarker>
  );
};

export default ArtistMarker;
