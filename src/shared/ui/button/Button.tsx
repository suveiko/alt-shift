import { clsx } from 'clsx';

import styles from './styles.module.css';
import LoadingIcon from '../../assets/loading-icon.svg?react';

import type { ButtonProps } from './types';

export const Button = ({
  variant = 'filled',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  iconOnly = false,
  className,
  children,
  disabled,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        iconOnly && styles.iconOnly,
        className,
      )}
      disabled={disabled || loading}
      aria-label={iconOnly ? ariaLabel : undefined}
      aria-busy={loading}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      {loading && <LoadingIcon className={styles.spinner} />}

      <span className={clsx(styles.content, loading && styles.contentHidden)}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

        {children}

        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </span>
    </button>
  );
};
