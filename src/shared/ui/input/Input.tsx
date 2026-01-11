import { clsx } from 'clsx';
import { forwardRef, useId } from 'react';

import styles from './styles.module.css';

import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className, id, ...props }, ref) => {
    const generatedId = useId();

    const inputId = id || generatedId;

    return (
      <div
        className={clsx(
          styles.container,
          fullWidth && styles.fullWidthContainer,
        )}
      >
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={clsx(
            styles.input,
            error && styles.error,
            fullWidth && styles.fullWidth,
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
