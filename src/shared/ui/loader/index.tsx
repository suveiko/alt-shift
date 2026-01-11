import styles from './styles.module.css';
import CustomLoader1 from '../../assets/custom-loader1-icon.svg?react';
import CustomLoader2 from '../../assets/custom-loader2-icon.svg?react';

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <CustomLoader1 className={styles.loaderIcon1} />

        <CustomLoader2 className={styles.loaderIcon2} />
      </div>
    </div>
  );
};
