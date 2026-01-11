import { useIsMutating, useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { PROGRESS, STORAGE_KEYS } from '@shared/config';
import { useLocalStorageUpdate, Storage } from '@shared/lib';

import { generateApplicationLetter } from '../api/generate-application';

import type { ApplicationFormData } from './types';

export const MUTATION_KEY = ['generate-application'] as const;

export type StoredApplication = {
  id: string;
  content: string;
  jobTitle: string;
  company: string;
};

const storage = new Storage('local');

export const useApplicationsData = () => {
  const { triggerUpdate } = useLocalStorageUpdate();

  const applications =
    storage.get<StoredApplication[]>(STORAGE_KEYS.applications) ?? [];

  const saveApplication = useCallback(
    (content: string, jobTitle: string, company: string) => {
      const currentApplications =
        storage.get<StoredApplication[]>(STORAGE_KEYS.applications) ?? [];

      const newApplication: StoredApplication = {
        id: crypto.randomUUID(),
        content,
        jobTitle,
        company,
      };

      const updatedApplications = [newApplication, ...currentApplications];

      storage.set(STORAGE_KEYS.applications, updatedApplications);

      triggerUpdate();
    },
    [triggerUpdate],
  );

  const deleteApplication = useCallback(
    (id: string) => {
      const currentApplications =
        storage.get<StoredApplication[]>(STORAGE_KEYS.applications) ?? [];

      const updatedApplications = currentApplications.filter((application) => {
        return application.id !== id;
      });

      storage.set(STORAGE_KEYS.applications, updatedApplications);

      triggerUpdate();
    },
    [triggerUpdate],
  );

  const progressCount = Math.min(applications.length, PROGRESS.goalApplications);

  return {
    applications,
    saveApplication,
    deleteApplication,
    generatedCount: progressCount,
    maxGenerations: PROGRESS.goalApplications,
  };
};

type UseGenerateApplicationReturn = {
  mutation: ReturnType<
    typeof useMutation<
      { result: string; data: ApplicationFormData },
      Error,
      ApplicationFormData
    >
  >;
  isGenerating: boolean;
  error: Nullable<string>;
};

export const useGenerateApplication = (): UseGenerateApplicationReturn => {
  const { saveApplication } = useApplicationsData();

  const mutation = useMutation({
    mutationKey: MUTATION_KEY,
    mutationFn: async (data: ApplicationFormData) => {
      const result = await generateApplicationLetter(data);

      return { result, data };
    },
    onSuccess: ({ result, data }) => {
      saveApplication(result, data.jobTitle, data.company);
    },
  });

  const isMutating = useIsMutating({ mutationKey: MUTATION_KEY });

  return {
    mutation,
    isGenerating: isMutating > 0,
    error: mutation.error?.message ?? null,
  };
};
