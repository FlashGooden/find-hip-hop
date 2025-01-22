import React from 'react';
import Modal from 'react-modal';
import ArtistProfilePage from '../ArtistProfilePage';
import { Artist } from '../MapComponent/MapComponent';

interface ArtistModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  artist: Artist | null;
}

const ArtistModal: React.FC<ArtistModalProps> = ({ isOpen, onRequestClose, artist }) => {
  if (!artist) return null;

  return (
    <>
     <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Artist Profile"
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          display: 'absolute',
          color: 'black',
          zIndex: 1000,
        },
      }}
    >
      <button onClick={onRequestClose}>Close</button>
      <ArtistProfilePage currentArtist={artist} />
    </Modal>
    </>

  );
};

export default ArtistModal;
