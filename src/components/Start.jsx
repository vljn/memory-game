import styles from '../styles/Start.module.css';

export default function Start({ onClick, status }) {
  return (
    <div className={styles.start}>
      <h1>
        {status === 'first'
          ? 'Welcome!'
          : status === 'lost'
          ? 'Try again!'
          : status === 'victory'
          ? 'Congrats!'
          : null}
      </h1>
      {status === 'first' ? (
        <p>
          Test your memory by trying to click all the images without clicking the ones you&apos;ve
          already clicked
        </p>
      ) : null}
      <h3>Choose difficulty:</h3>
      <div className={styles.buttons}>
        <button onClick={() => onClick('easy')}>Easy</button>
        <button onClick={() => onClick('normal')}>Normal</button>
        <button onClick={() => onClick('hard')}>Hard</button>
        <button onClick={() => onClick('custom')}>Custom</button>
      </div>
    </div>
  );
}
