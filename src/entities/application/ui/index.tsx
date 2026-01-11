import { useIsMutating } from '@tanstack/react-query';
import { clsx } from 'clsx';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

import CheckIcon from '@shared/assets/check-icon.svg?react';
import CopyIcon from '@shared/assets/copy-icon.svg?react';
import TrashIcon from '@shared/assets/trash-icon.svg?react';
import { sleep } from '@shared/lib';
import { APPLICATION_CARD_TEST_IDS } from '@shared/testing';
import { Button, Loader } from '@shared/ui';

import { COPY_TIMEOUT_MS, getAriaLabel, PLACEHOLDER_TEXT } from '../lib';
import styles from './styles.module.css';
import { MUTATION_KEY, useApplicationsData } from '../model/use-applications';

import type { StoredApplication } from '../model/use-applications';
import type { MouseEvent } from 'react';

export type Props = {
  application?: StoredApplication;
  variant?: 'compact' | 'full';
  showDelete?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
};

export const ApplicationCard = ({
  application,
  variant = 'compact',
  showDelete = true,
  onClick,
  onDelete,
}: Props) => {
  const { deleteApplication } = useApplicationsData();
  const isMutating = useIsMutating({ mutationKey: MUTATION_KEY });
  const isGenerating = isMutating > 0;

  const [isCopied, setIsCopied] = useState(false);

  const content = application?.content || '';
  const displayContent = content || PLACEHOLDER_TEXT;
  const isPlaceholder = !content;

  const ariaLabel = getAriaLabel(application?.jobTitle, application?.company);

  const handleCopy = async (event: MouseEvent) => {
    event.stopPropagation();

    if (!content) {
      return;
    }

    copy(content);

    setIsCopied(true);

    await sleep(COPY_TIMEOUT_MS);

    setIsCopied(false);
  };

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();

    if (application?.id) {
      deleteApplication(application.id);
      onDelete?.();
    }
  };

  const contentClassName = clsx(
    styles.content,
    variant === 'compact' && styles.contentCompact,
    variant === 'full' && styles.contentFull,
  );

  const shouldShowDelete = showDelete && !isPlaceholder;

  const cardClassName = clsx(styles.card, onClick && styles.clickable);

  return (
    <article
      className={cardClassName}
      data-testid={APPLICATION_CARD_TEST_IDS.root}
      role="article"
      aria-label={ariaLabel}
      aria-busy={isGenerating}
      onClick={onClick}
    >
      {isGenerating ? (
        <Loader />
      ) : (
        <div
          className={contentClassName}
          data-testid={APPLICATION_CARD_TEST_IDS.letterContent}
        >
          {displayContent}
        </div>
      )}

      {!isGenerating && (
        <div className={shouldShowDelete ? styles.actions : styles.actionsEnd}>
          {shouldShowDelete && application?.id && (
            <Button
              variant="transparent"
              size="md"
              leftIcon={<TrashIcon />}
              onClick={handleDelete}
              data-testid={APPLICATION_CARD_TEST_IDS.deleteButton}
              aria-label="Delete application"
            >
              Delete
            </Button>
          )}

          <Button
            variant="transparent"
            size="md"
            rightIcon={
              isCopied ? (
                <CheckIcon className={styles.icon} />
              ) : (
                <CopyIcon className={styles.icon} />
              )
            }
            onClick={handleCopy}
            disabled={isPlaceholder}
            data-testid={APPLICATION_CARD_TEST_IDS.copyButton}
            aria-label={
              isCopied
                ? 'Application copied to clipboard'
                : 'Copy application to clipboard'
            }
          >
            {isCopied ? 'Copied!' : 'Copy to clipboard'}
          </Button>
        </div>
      )}
    </article>
  );
};
