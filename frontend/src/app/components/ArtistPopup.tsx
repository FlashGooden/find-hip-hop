import React from "react";
import { InfoWindow } from "@react-google-maps/api";

interface Artist {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface ArtistPopupProps {
  artist: Artist;
  onClose: () => void;
}

const ArtistPopup: React.FC<ArtistPopupProps> = ({ artist, onClose }) => (
  <InfoWindow
    position={{ lat: artist.latitude, lng: artist.longitude }}
    onCloseClick={onClose}
  >
    <div>
      <h3>{artist.name}</h3>
      <p>{artist.description}</p>
      <a href={`/artist/${artist.id}`}>View Profile</a>
    </div>
  </InfoWindow>
);

export default ArtistPopup;
