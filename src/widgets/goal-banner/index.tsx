import { CreateApplicationButton } from '@features/create-application-button';

import { useApplicationsData } from '@entities/application';

import { GOAL_BANNER_TEST_IDS } from '@shared/testing';
import { ProgressIndicator } from '@shared/ui';

import styles from './styles.module.css';

type Props = {
  onCreateNewClick?: () => void;
};

export const GoalBanner = ({ onCreateNewClick }: Props) => {
  const { generatedCount, maxGenerations } = useApplicationsData();

  return (
    <section
      className={styles.card}
      data-testid={GOAL_BANNER_TEST_IDS.root}
      aria-labelledby="goal-banner-title"
    >
      <div className={styles.content}>
        <h2
          id="goal-banner-title"
          className={styles.title}
          data-testid={GOAL_BANNER_TEST_IDS.title}
        >
          Hit your goal
        </h2>

        <p
          className={styles.description}
          data-testid={GOAL_BANNER_TEST_IDS.description}
        >
          Generate and send out couple more job applications today to get hired
          faster
        </p>
      </div>

      <CreateApplicationButton
        onClick={onCreateNewClick}
        size="lg"
        data-testid={GOAL_BANNER_TEST_IDS.createButton}
      />

      <ProgressIndicator
        current={generatedCount}
        max={maxGenerations}
        viewType="tiles-top"
      />
    </section>
  );
};
