import React, { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Marker,
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
    latitude: 33.679,
    longitude: -84.4394,
    image: "Andre-3k.png",
  },
  {
    id: "2",
    name: "T.I.",
    description: "TI is a renowned hip hop artist with numerous hits.",
    latitude: 33.7702,
    longitude: -84.4619,
    image: "TI.png",
  },
  {
    id: "3",
    name: "2 Chainz",
    description: "TI is a renowned hip hop artist with numerous hits.",
    latitude: 33.6534,
    longitude: -84.4494,
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
    latitude: 33.7595,
    longitude: -84.5054,
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
];
const artistTIMarker = {
  lat: 33.765,
  lng: -84.451,
};

const artistAndreMarker = {
  lat: 33.679,
  lng: -84.4394,
};

const MapComponent: React.FC<MapComponentProps> = () => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [hoveredArtist, setHoveredArtist] = useState<Artist | null>(null);
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [zoomLevel, setZoomLevel] = useState<number>(9);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Fetch artist data from API
    console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, "API");
    console.log(process, "API");

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

  // return (
  //   <LoadScript
  //     googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
  //   >
  //     <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={4}>
  //       {artists.map((artist) => (
  //         <Marker
  //           key={artist.id}
  //           position={{ lat: artist.latitude, lng: artist.longitude }}
  //           onClick={() => setSelectedArtist(artist)}
  //         />
  //       ))}

  //       {selectedArtist && (
  //         <InfoWindow
  //           position={{
  //             lat: selectedArtist.latitude,
  //             lng: selectedArtist.longitude,
  //           }}
  //           onCloseClick={() => setSelectedArtist(null)}
  //         >
  //           <div>
  //             <h3>{selectedArtist.name}</h3>
  //             <p>{selectedArtist.description}</p>
  //             <a href={`/artist/${selectedArtist.id}`}>View Profile</a>
  //           </div>
  //         </InfoWindow>
  //       )}
  //     </GoogleMap>
  //   </LoadScript>
  // );
};

export default MapComponent;
