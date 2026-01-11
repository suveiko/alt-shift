import styles from './styles.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>

      <p className={styles.description}>Page not found</p>
    </div>
  );
};

export default NotFoundPage;
