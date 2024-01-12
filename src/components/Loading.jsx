import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loader}>
      <FontAwesomeIcon icon={faCircleNotch} spin size="7x" />
    </div>
  );
}
