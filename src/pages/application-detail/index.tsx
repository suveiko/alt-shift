import { useNavigate, useParams } from 'react-router-dom';

import { ApplicationCard, useApplicationsData } from '@entities/application';

import { RoutesPaths } from '@shared/routing';

const ApplicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { applications } = useApplicationsData();

  const application = applications.find((app) => app.id === id);

  const handleDelete = () => {
    navigate(RoutesPaths.home);
  };

  return (
    <ApplicationCard
      application={application}
      variant="full"
      onDelete={handleDelete}
    />
  );
};

export default ApplicationDetailPage;
