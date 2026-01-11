import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMutating } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { MUTATION_KEY } from '@entities/application';
import type { ApplicationFormData } from '@entities/application';

import RepeatIcon from '@shared/assets/repeat-icon.svg?react';
import { VALIDATION_LIMITS } from '@shared/config';
import { APPLICATION_FORM_TEST_IDS } from '@shared/testing';
import {
  Button,
  Divider,
  ErrorMessage,
  FormInput,
  FormTextarea,
} from '@shared/ui';

import { applicationFormSchema, INITIAL_VALUES } from '../lib';
import styles from './styles.module.css';

import type { UseMutationResult } from '@tanstack/react-query';

type Props = {
  mutation: UseMutationResult<
    { result: string; data: ApplicationFormData },
    Error,
    ApplicationFormData
  >;
};

export const ApplicationForm = ({ mutation }: Props) => {
  const isMutating = useIsMutating({ mutationKey: MUTATION_KEY });
  const isGenerating = isMutating > 0;
  const error: Nullable<string> = mutation.error?.message ?? null;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    mode: 'onChange',
    defaultValues: INITIAL_VALUES,
  });

  const jobTitle = useWatch({ control, name: 'jobTitle' });
  const company = useWatch({ control, name: 'company' });

  const title = useMemo(() => {
    const trimmedJobTitle = jobTitle?.trim();
    const trimmedCompany = company?.trim();

    if (trimmedJobTitle && trimmedCompany) {
      return `${trimmedJobTitle}, ${trimmedCompany}`;
    }

    return trimmedJobTitle || trimmedCompany || 'New application';
  }, [jobTitle, company]);

  const hasContent = jobTitle?.trim() || company?.trim();

  const handleFormSubmit = (data: ApplicationFormData) => {
    const trimmedData: ApplicationFormData = {
      jobTitle: data.jobTitle.trim(),
      company: data.company.trim(),
      skills: data.skills.trim(),
      additionalDetails: data.additionalDetails.trim(),
    };

    mutation.mutate(trimmedData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const disabledGeneratingButton = !isValid || isGenerating;

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <h1
        className={hasContent ? styles.title : styles.titlePlaceholder}
        data-testid={APPLICATION_FORM_TEST_IDS.title}
      >
        {title}
      </h1>

      <Divider />

      <div className={styles.row}>
        <FormInput
          name="jobTitle"
          control={control}
          label="Job title"
          placeholder="Product manager"
          disabled={isGenerating}
        />

        <FormInput
          name="company"
          control={control}
          label="Company"
          placeholder="Apple"
          disabled={isGenerating}
        />
      </div>

      <FormInput
        name="skills"
        control={control}
        label="I am good at…"
        placeholder="HTML, CSS, time management"
        disabled={isGenerating}
      />

      <FormTextarea
        name="additionalDetails"
        control={control}
        label="Additional details"
        placeholder="Any additional information you'd like to include..."
        disabled={isGenerating}
        rows={8}
        showCounter
        maxLength={VALIDATION_LIMITS.additionalDetails.max}
      />

      {mutation.isSuccess ? (
        <Button
          type="submit"
          disabled={disabledGeneratingButton}
          variant="outline"
          size="lg"
          leftIcon={<RepeatIcon />}
          loading={isGenerating}
          fullWidth
          data-testid={APPLICATION_FORM_TEST_IDS.tryAgainButton}
        >
          Try Again
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={disabledGeneratingButton}
          variant="filled"
          size="lg"
          loading={isGenerating}
          fullWidth
          data-testid={APPLICATION_FORM_TEST_IDS.generateButton}
        >
          Generate Now
        </Button>
      )}

      {error && <ErrorMessage message={error} />}
    </form>
  );
};
