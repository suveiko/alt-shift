import { Controller } from 'react-hook-form';

import { Input } from './Input';

import type { InputProps } from './Input';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: ControllerProps<TFieldValues, TName>['control'];
  rules?: ControllerProps<TFieldValues, TName>['rules'];
  defaultValue?: TFieldValues[TName];
} & Omit<InputProps, 'error'>;

export const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  defaultValue,
  ...props
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        return (
          <Input
            {...field}
            {...props}
            error={fieldState.error?.message}
            aria-invalid={fieldState.invalid}
          />
        );
      }}
    />
  );
};
