import { clsx } from 'clsx';
import { forwardRef, useId } from 'react';

import styles from './styles.module.css';

import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  showCounter?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      showCounter = true,
      className,
      id,
      maxLength,
      value,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const currentLength = value ? String(value).length : 0;

    return (
      <div
        className={clsx(
          styles.container,
          fullWidth && styles.fullWidthContainer,
        )}
      >
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            styles.textarea,
            error && styles.error,
            fullWidth && styles.fullWidth,
            className,
          )}
          value={value}
          aria-invalid={!!error}
          {...props}
        />

        {showCounter && (
          <div className={styles.footer}>
            <span
              className={clsx(styles.counter, error && styles.counterError)}
            >
              {currentLength}

              {maxLength && ` / ${maxLength}`}
            </span>
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
