import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const TicketNamePattern = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.ticketNamePattern.name, {
        required: 'Specify the pattern to find a Jira ticket number in a commit message.',
      })}
      label={'Specify the pattern to find a Jira ticket number in a commit message'}
      // @ts-ignore
      title={
        <>
          <p>
            Set a regular expression pattern to identify Jira ticket numbers in commit messages.
          </p>
          <p>
            This facilitates seamless integration with your issue tracking system. An example
            pattern could be
          </p>
          <p>"(JIRA|jira|Issue|issue) [A-Z]+-[0-9]+"</p>
        </>
      }
      placeholder={'PROJECT_NAME-\\d{4}'}
      control={control}
      errors={errors}
    />
  );
};
