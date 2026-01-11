import { useNavigate } from 'react-router-dom';

import { useApplicationsData } from '@entities/application';
import { ApplicationCard } from '@entities/application';

import { getApplicationDetailPath } from '@shared/routing';

import styles from './styles.module.css';

export const ApplicationsList = () => {
  const { applications } = useApplicationsData();

  const navigate = useNavigate();

  const handleCardClick = (id: string) => () => {
    navigate(getApplicationDetailPath(id));
  };

  return (
    <div className={styles.applications}>
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onClick={handleCardClick(application.id)}
        />
      ))}
    </div>
  );
};
