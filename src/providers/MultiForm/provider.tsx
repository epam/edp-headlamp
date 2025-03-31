import React from 'react';
import { MultiFormContext } from './context';
import { FormItem, MultiFormContextProviderProps } from './types';

export const MultiFormContextProvider = <FormName extends string>({
  children,
  forms,
  sharedForm,
}: MultiFormContextProviderProps<FormName>) => {
  const { isAnyFormDirty, isAnyFormSubmitting, isAnyFormForbiddenToSubmit } = React.useMemo(
    () =>
      Object.values<FormItem>(forms).reduce<{
        isAnyFormDirty: boolean;
        isAnyFormSubmitting: boolean;
        isAnyFormForbiddenToSubmit: boolean;
      }>(
        (acc, formItem) => {
          const form = formItem.form;

          if (
            !acc.isAnyFormDirty &&
            form.formState.dirtyFields &&
            Object.keys(form.formState.dirtyFields).length > 0
          ) {
            acc.isAnyFormDirty = true;
          }

          if (!acc.isAnyFormSubmitting && formItem.isSubmitting) {
            acc.isAnyFormSubmitting = true;
          }

          if (!acc.isAnyFormForbiddenToSubmit && !formItem.allowedToSubmit.isAllowed) {
            acc.isAnyFormForbiddenToSubmit = true;
          }

          return acc;
        },
        {
          isAnyFormDirty: false,
          isAnyFormSubmitting: false,
          isAnyFormForbiddenToSubmit: false,
        }
      ),
    [forms]
  );

  const resetAll = React.useCallback(async () => {
    const resetPromises = Object.values<FormItem>(forms).map((formItem) =>
      formItem.form.reset({}, { keepDirty: false })
    );
    await Promise.all(resetPromises);
  }, [forms]);

  const submitAll = React.useCallback(
    async (onlyDirty: boolean = true) => {
      for (const formName in forms) {
        const formItem = forms[formName];
        const form = formItem.form;

        const valid = await form.trigger();

        if (!valid) {
          return;
        }
      }

      for (const formName in forms) {
        const formItem = forms[formName];
        const form = formItem.form;

        const isFormDirty =
          form.formState.dirtyFields && Object.keys(form.formState.dirtyFields).length > 0;

        if (isFormDirty || !onlyDirty) {
          await formItem.onSubmit();
          formItem.form.reset({}, { keepDirty: false, keepValues: true });
        }
      }
    },
    [forms]
  );

  const value = React.useMemo(
    () => ({
      forms,
      resetAll,
      submitAll,
      isAnyFormDirty,
      isAnyFormSubmitting,
      isAnyFormForbiddenToSubmit,
      sharedForm: sharedForm!,
    }),
    [
      forms,
      resetAll,
      submitAll,
      isAnyFormDirty,
      isAnyFormSubmitting,
      isAnyFormForbiddenToSubmit,
      sharedForm,
    ]
  );

  return <MultiFormContext.Provider value={value}>{children}</MultiFormContext.Provider>;
};
