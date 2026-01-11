import { ApplicationsList } from '@widgets/applications-list';
import { GoalBanner } from '@widgets/goal-banner';

import { CreateApplicationButton } from '@features/create-application-button';

import { useApplicationsData } from '@entities/application';

import { PAGE_HEADER_TEST_IDS } from '@shared/testing';
import { Divider } from '@shared/ui';

import styles from './styles.module.css';

const ApplicationsPage = () => {
  const { generatedCount, maxGenerations, applications } =
    useApplicationsData();

  const shouldShowGoalBanner = generatedCount < maxGenerations;
  const shouldShowApplicationsList = applications.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title} data-testid={PAGE_HEADER_TEST_IDS.title}>
          Applications
        </h1>

        <CreateApplicationButton
          data-testid={PAGE_HEADER_TEST_IDS.createButton}
        />
      </div>

      <Divider />

      {shouldShowApplicationsList && <ApplicationsList />}

      {shouldShowGoalBanner && <GoalBanner />}
    </div>
  );
};

export default ApplicationsPage;
