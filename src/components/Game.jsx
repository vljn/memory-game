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
  const [tryAgain, setTryAgain] = useState(false);
  const [initial, setInitial] = useState(true);

  if (!loading && !hasError && !tryAgain && score === gifs.length) {
    updateStatus('victory');
  }

  useEffect(() => {
    const fetchData = async () => {
      setInitial(false);
      setLoading(true);
      setTryAgain(false);
      try {
        const fetchedGifs = await getGifs(numberOfImages);
        const shuffledGifs = arrayShuffle(fetchedGifs);
        setGifs(
          shuffledGifs.map((gif) => {
            return { src: gif, clicked: false };
          })
        );
        setHasError(false);
        setLoading(false);
        setTryAgain(false);
      } catch {
        setHasError(true);
        setTimeout(() => {
          setTryAgain(true);
        }, 1000);
      }
    };
    if (initial || tryAgain) fetchData();
  }, [tryAgain, numberOfImages, initial]);

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
    if (hasError || tryAgain || loading || gifs.length === 0) {
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
      {!loading && !hasError && !tryAgain ? (
        <div className={styles.score}>Score: {score}</div>
      ) : null}

      {renderGifs()}
    </div>
  );
}
