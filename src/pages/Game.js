import React, { useState, useEffect, useRef } from 'react';
import Main from '../layouts/Main';

const Games = () => {
  const games = [
    { id: 'pacman', name: 'Pac-Man', link: '/Personal-Website/games/pacman/index.html' },
    { id: 'chess', name: 'Chess', link: '/Personal-Website/games/chess/index.html' },
  ];

  const [selectedGame, setSelectedGame] = useState(null);
  const iframeRef = useRef(null); // Reference to the iframe element

  useEffect(() => {
    const handleKeydown = (event) => {
      // Check if the iframe is focused and the key is one of the arrow keys
      if (iframeRef.current && iframeRef.current === document.activeElement) {
        // Prevent default action for arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId);
  };

  return (
    <Main title="Games" description="Play mini-games here!">
      <div>
        <h1>Games</h1>
        <div>
          {games.map((game) => (
            <button
              key={game.id}
              type="button"
              onClick={() => handleGameSelect(game.id)}
              style={{
                margin: '10px',
                padding: '10px 20px',
                cursor: 'pointer',
              }}
            >
              {game.name}
            </button>
          ))}
        </div>
        {selectedGame && (
          <div style={{ marginTop: '20px' }}>
            <h2>Playing {games.find((g) => g.id === selectedGame)?.name}</h2>
            <iframe
              ref={iframeRef}
              src={`/Personal-Website/games/${selectedGame}/index.html`}
              style={{
                width: '100%',
                height: '80vh',
                border: 'none',
              }}
              title={`Game: ${selectedGame}`}
            />
          </div>
        )}
      </div>
    </Main>
  );
};

export default Games;
