import styles from './styles.module.css';

type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => {
  return <div className={styles.error}>{message}</div>;
};
