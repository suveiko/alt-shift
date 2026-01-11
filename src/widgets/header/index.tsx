import { useNavigate } from 'react-router-dom';

import { useApplicationsData } from '@entities/application';

import HomeIcon from '@shared/assets/home-icon.svg?react';
import { RoutesPaths } from '@shared/routing';
import { AppLogo, Button, ProgressIndicator } from '@shared/ui';

import styles from './styles.module.css';

export const Header = () => {
  const navigate = useNavigate();

  const { generatedCount, maxGenerations } = useApplicationsData();

  const handleHomeClick = () => {
    navigate(RoutesPaths.home);
  };

  return (
    <header className={styles.header}>
      <AppLogo />

      <div className={styles.rightSection}>
        <div className={styles.progress}>
          <ProgressIndicator
            max={maxGenerations}
            current={generatedCount}
            viewType="dots-right"
          />
        </div>

        <Button variant="outline" iconOnly onClick={handleHomeClick}>
          <HomeIcon />
        </Button>
      </div>
    </header>
  );
};
