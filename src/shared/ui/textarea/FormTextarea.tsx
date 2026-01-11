import { Controller } from 'react-hook-form';

import { Textarea } from './Textarea';

import type { TextareaProps } from './Textarea';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

export type FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: ControllerProps<TFieldValues, TName>['control'];
  rules?: ControllerProps<TFieldValues, TName>['rules'];
  defaultValue?: TFieldValues[TName];
} & Omit<TextareaProps, 'error' | 'value'>;

export const FormTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  defaultValue,
  ...textareaProps
}: FormTextareaProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        return (
          <Textarea
            {...field}
            {...textareaProps}
            error={fieldState.error?.message}
            aria-invalid={fieldState.invalid}
          />
        );
      }}
    />
  );
};
