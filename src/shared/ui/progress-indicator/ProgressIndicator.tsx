import { clsx } from 'clsx';

import styles from './styles.module.css';
import CheckIcon from '../../assets/check-icon.svg?react';

export type ProgressIndicatorView = 'dots-right' | 'tiles-top';

export interface ProgressIndicatorProps {
  current: number;
  max: number;
  viewType?: ProgressIndicatorView;
}

export const ProgressIndicator = ({
  current,
  max,
  viewType = 'dots-right',
}: ProgressIndicatorProps) => {
  const indicators = Array.from({ length: max }, (_, index) => index < current);

  const isComplete = current === max;
  const dotsLabel = `${current}/${max} applications generated`;
  const tilesLabel = `${current} out of ${max}`;
  const ariaLabel = `${current} out of ${max} applications created`;

  if (viewType === 'tiles-top') {
    return (
      <div
        className={styles.containerVertical}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
      >
        <div className={styles.tilesRow}>
          {indicators.map((isActive, index) => {
            return (
              <div
                key={index}
                className={clsx(styles.tile, isActive && styles.tileActive)}
                aria-hidden="true"
              />
            );
          })}
        </div>

        <span className={styles.textVertical} aria-hidden="true">
          {tilesLabel}
        </span>
      </div>
    );
  }

  return (
    <div
      className={styles.containerHorizontal}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
    >
      <span className={styles.textHorizontal} aria-hidden="true">
        {dotsLabel}
      </span>

      {isComplete ? (
        <CheckIcon className={styles.checkIcon} aria-hidden="true" />
      ) : (
        <div className={styles.dotsRow} aria-hidden="true">
          {indicators.map((isActive, index) => {
            return (
              <div
                key={index}
                className={clsx(styles.dot, isActive && styles.dotActive)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
