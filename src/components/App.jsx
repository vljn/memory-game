import '../styles/App.css';
import giphy from '../assets/giphyAttribution.png';
import Game from './Game';
import Header from './Header';
import Footer from './Footer';
import Start from './Start';
import { useState } from 'react';

function App() {
  const [difficulty, setDifficulty] = useState('');
  const [gameStatus, setGameStatus] = useState('first');
  const [bestScore, setBestScore] = useState(0);
  let difficulties = { easy: 6, normal: 10, hard: 15 };

  function handleStartClick(difficulty) {
    if (difficulty === 'custom') {
      const customDifficulty = parseInt(prompt('Enter the number of emojis (max 100):'));
      if (customDifficulty > 100) {
        alert('Maximum number of emojis is 100');
        return;
      } else if (customDifficulty < 0) {
        alert("Can't set a negative value");
        return;
      }
      setDifficulty(customDifficulty);
    } else {
      setDifficulty(difficulties[difficulty]);
    }
    setGameStatus('playing');
  }

  return (
    <>
      <Header updateStatus={setGameStatus}>Emoji Memory Game</Header>
      {gameStatus === 'playing' ? (
        <Game
          numberOfImages={difficulty}
          bestScore={bestScore}
          updateBestScore={setBestScore}
          updateStatus={setGameStatus}
        />
      ) : (
        <Start onClick={handleStartClick} status={gameStatus} />
      )}
      <div className="best-score">Best Score: {bestScore}</div>
      <Footer>
        <img src={giphy} alt="" />
      </Footer>
    </>
  );
}

export default App;
