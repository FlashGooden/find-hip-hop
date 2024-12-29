import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';


interface MapComponentProps {
  filters: {
    genre: string;
    popularity: string;
    location: string;
  };
}
interface Artist {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

const mapContainerStyle = {
  height: '100vh',
  width: '100%',
};

const center = {
  lat: 33.7490,
  lng: -84.3880,
};

const MapComponent: React.FC<MapComponentProps> = () => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    // Fetch artist data from API
    axios.get('/api/artists')
      .then(response => setArtists(response.data))
      .catch(error => console.error('Error fetching artist data:', error));
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={4}
      >
        {artists.map(artist => (
          <Marker
            key={artist.id}
            position={{ lat: artist.latitude, lng: artist.longitude }}
            onClick={() => setSelectedArtist(artist)}
          />
        ))}

        {selectedArtist && (
          <InfoWindow
            position={{ lat: selectedArtist.latitude, lng: selectedArtist.longitude }}
            onCloseClick={() => setSelectedArtist(null)}
          >
            <div>
              <h3>{selectedArtist.name}</h3>
              <p>{selectedArtist.description}</p>
              <a href={`/artist/${selectedArtist.id}`}>View Profile</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
