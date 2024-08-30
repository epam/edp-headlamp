import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const CommitMessagePattern = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.commitMessagePattern.name)}
      label={'Specify the pattern to validate a commit message'}
      // @ts-ignore
      title={
        <>
          <p>Define a regular expression pattern to validate commit messages.</p>
          <p>
            This ensures consistency in your version control history. For example, use a pattern
            like
          </p>
          <p>"^(feat|fix|docs|style|refactor|test|chore): [A-Za-z]."</p>
        </>
      }
      placeholder={'^\\[PROJECT_NAME-\\d{4}\\]:.*'}
      control={control}
      errors={errors}
    />
  );
};
