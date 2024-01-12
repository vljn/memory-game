import styles from '../styles/Header.module.css';

export default function Header({ children, updateStatus }) {
  return (
    <header onClick={() => updateStatus('first')} className={styles.header}>
      <h1>{children}</h1>
    </header>
  );
}
