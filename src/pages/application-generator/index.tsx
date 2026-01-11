import { GoalBanner } from '@widgets/goal-banner';

import { ApplicationForm } from '@features/create-application';

import {
  ApplicationCard,
  useApplicationsData,
  useGenerateApplication,
} from '@entities/application';

import styles from './styles.module.css';

const ApplicationGeneratorPage = () => {
  const { applications, generatedCount, maxGenerations } =
    useApplicationsData();

  const { mutation } = useGenerateApplication();

  const shouldShowGoalBanner =
    mutation.isSuccess && generatedCount < maxGenerations;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formSection}>
          <ApplicationForm mutation={mutation} />
        </div>

        <ApplicationCard
          application={mutation.isSuccess ? applications[0] : undefined}
          variant="full"
          showDelete={false}
        />
      </div>

      {shouldShowGoalBanner && (
        <div className={styles.goalBanner}>
          <GoalBanner onCreateNewClick={mutation.reset} />
        </div>
      )}
    </>
  );
};

export default ApplicationGeneratorPage;
