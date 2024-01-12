import { useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';
import styles from '../styles/Game.module.css';
import Loading from './Loading';
import getGifs from '../functions/getGifs';
import Image from './Image';

export default function Game({ numberOfImages, bestScore, updateBestScore, updateStatus }) {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [score, setScore] = useState(0);
  const [gifs, setGifs] = useState([]);

  if (!loading && score === gifs.length) {
    updateStatus('victory');
  }

  useEffect(() => {
    const fetchData = async () => {
      setHasError(false);
      try {
        const fetchedGifs = await getGifs(numberOfImages);
        const shuffledGifs = arrayShuffle(fetchedGifs);
        setLoading(false);
        setGifs(
          shuffledGifs.map((gif) => {
            return { src: gif, clicked: false };
          })
        );
      } catch (error) {
        setHasError(true);
        setLoading(false);
        setTimeout(() => setLoading(true), 5000);
      }
    };

    fetchData();
  }, [numberOfImages, loading]);

  function handleImageClick(e) {
    const clickedSrc = e.target.currentSrc;
    const newArr = gifs.map((gif) => {
      if (gif.src === clickedSrc) {
        if (gif.clicked) {
          updateStatus('lost');
        } else {
          updateScore();
          return { ...gif, clicked: true };
        }
      }
      return gif;
    });
    const shuffled = arrayShuffle(newArr);
    setGifs(shuffled);
  }

  function updateScore() {
    setScore((s) => (s += 1));
    if (score + 1 > bestScore) {
      updateBestScore(score + 1);
    }
  }

  function renderGifs() {
    if (hasError) return;
    if (loading || gifs.length === 0) {
      return <Loading />;
    }
    return (
      <div className={styles['image-container']}>
        {gifs.map((gifObj) => (
          <Image key={gifObj.src} src={gifObj.src} onClick={handleImageClick} />
        ))}
      </div>
    );
  }

  function renderError() {
    if (hasError) {
      return (
        <div className={styles.error}>
          <h2>Oh, no!</h2>
          <p>There was an error trying to load your gifs. Trying again soon</p>
        </div>
      );
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {renderError()}
      <div className={styles.score}>Score: {score}</div>
      {renderGifs()}
    </div>
  );
}
