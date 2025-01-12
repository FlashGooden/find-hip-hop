import React, { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import axios from "axios";
import ArtistMarker from "../ArtistMarker/ArtistMarker";

interface MapComponentProps {
  filters: {
    genre: string;
    popularity: string;
    location: string;
  };
}
export interface Artist {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  image: string;
}

const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 33.749,
  lng: -84.388,
};

const initialArtists: Artist[] = [
  {
    id: "1",
    name: "Andre 3000",
    description: "Andre is a hip hop artist known for his unique style.",
    latitude: 33.6846,
    longitude: -84.4363,
    image: "Andre-3k.png",
  },
  {
    id: "2",
    name: "Shawty Lo",
    description: "Shawty Lo, was an American rapper from Atlanta, Georgia",
    latitude: 33.780707,
    longitude: -84.479678,
    image: "shawty-lo.png",
  },
  {
    id: "3",
    name: "2 Chainz",
    description: "TI is a renowned hip hop artist with numerous hits.",
    latitude: 33.608752,
    longitude: -84.439249,
    image: "2chainz.png",
  },
  {
    id: "4",
    name: "Big Boi",
    description: "Big Boi is a renowned hip hop artist with numerous hits.",
    latitude: 32.0221,
    longitude: -81.0844,
    image: "Big-Boi.png",
  },
  {
    id: "5",
    name: "Ludacris",
    description: "Ludacris is a renowned hip hop artist with numerous hits.",
    latitude: 33.59311,
    longitude: -84.51833,
    image: "Ludacris.png",
  },
  {
    id: "6",
    name: "Killer Mike",
    description: "Killer Mike Got hits",
    latitude: 33.761081,
    longitude: -84.468734,
    image: "killer-mike.png",
  },
  {
    id: "7",
    name: "Latto",
    description: "BIG LATTO!!",
    latitude: 33.4462,
    longitude: -84.3393,
    image: "latto.png",
  },
  {
    id: "8",
    name: "T.I.",
    description: "TI is a renowned hip hop artist with numerous hits. Center Hill Cedar Ave that's where I be sukka",
    latitude: 33.773192,
    longitude: -84.463854,
    image: "TI.png",
  },
  {
    id: "9",
    name: "Baby Tate",
    description: "Baby Tate began playing the piano and dancing at a young age, and started producing her own beats by age 13.",
    latitude: 33.759004,
    longitude: -84.268821,
    image: "baby-tate.png",
  },
  {
    id: "10",
    name: "Omeretta The Great",
    description: "Omeretta The Great is a rapper from Atlanta, Georgia.",
    latitude: 33.707299,
    longitude: -84.380049,
    image: "omeretta-the-great.png",
  },
];

const MapComponent: React.FC<MapComponentProps> = () => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [hoveredArtist, setHoveredArtist] = useState<Artist | null>(null);
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [zoomLevel, setZoomLevel] = useState<number>(9);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Fetch artist data from API
    // axios.get('/api/artists')
    //   .then(response => setArtists(response.data))
    //   .catch(error => console.error('Error fetching artist data:', error));
  }, []);

  const handleZoomChanged = (event: MapCameraChangedEvent) => {
    setZoomLevel(event.detail.zoom || 9);
    setSelectedArtist(null);
  };

  const handleMarkerMouseOver = (artist: Artist) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setSelectedArtist(artist);
  };

  const handleMarkerMouseOut = () => {
    hoverTimeout.current = setTimeout(() => {
      setSelectedArtist(null);
    }, 600);
  };

  const handleInfoWindowMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const handleInfoWindowMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setSelectedArtist(null);
    }, 900);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={center}
        zoom={zoomLevel}
        onZoomChanged={handleZoomChanged}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={"DEMO_MAP_ID"}
      >
        {zoomLevel > 9 && (
          <>
            {artists.map((artist) => (
              <ArtistMarker
                key={artist.id}
                artist={artist}
                image={artist.image}
                onHover={handleMarkerMouseOver}
                onHoverOut={handleMarkerMouseOut}
                zoomLevel={zoomLevel}
              />
            ))}
          </>
        )}
        {selectedArtist && zoomLevel > 9 && (
          <InfoWindow
            position={{
              lat: selectedArtist.latitude,
              lng: selectedArtist.longitude,
            }}
            shouldFocus={false}
            pixelOffset={[0, -70]}
            onCloseClick={() => setSelectedArtist(null)}
          >
            <div
              onMouseEnter={handleInfoWindowMouseEnter}
              onMouseLeave={handleInfoWindowMouseLeave}
              style={{ maxWidth: "400px", color: "black" }}
            >
              <h3>{selectedArtist.name}</h3>
              <p>{selectedArtist.description}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
