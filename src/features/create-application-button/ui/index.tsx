import { useNavigate } from 'react-router-dom';

import PlusIcon from '@shared/assets/plus-icon.svg?react';
import { RoutesPaths } from '@shared/routing';
import { Button } from '@shared/ui';
import type { ButtonProps } from '@shared/ui';

interface CreateApplicationButtonProps {
  size?: ButtonProps['size'];
  'data-testid'?: string;
  onClick?: () => void;
}

export const CreateApplicationButton = ({
  size = 'md',
  onClick,
  'data-testid': testId,
}: CreateApplicationButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();

      return;
    }

    navigate(RoutesPaths.newApplication);
  };

  return (
    <Button
      size={size}
      leftIcon={<PlusIcon />}
      onClick={handleClick}
      data-testid={testId}
      aria-label="Create new application"
    >
      Create New
    </Button>
  );
};
