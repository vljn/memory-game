import styles from '../styles/Image.module.css';

export default function Image({ src, onClick }) {
  return (
    <button className={styles.image} onClick={onClick}>
      <video autoPlay loop muted>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </button>
  );
}
