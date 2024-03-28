import React from 'react';
import { MultiFormContext } from './context';
import { FormItem, MultiFormContextProviderProps } from './types';

export const MultiFormContextProvider = <FormName extends string>({
  children,
  forms,
  sharedForm,
}: MultiFormContextProviderProps<FormName>) => {
  const resetAll = React.useCallback(
    () =>
      Object.values<FormItem>(forms).forEach((formItem) =>
        formItem.form.reset({}, { keepDirty: false })
      ),
    [forms]
  );

  const isAnyFormDirty = React.useMemo(
    () =>
      Object.values<FormItem>(forms).some(
        (formItem) =>
          formItem.form.formState.dirtyFields &&
          Object.keys(formItem.form.formState.dirtyFields).length > 0
      ),
    [forms]
  );

  const isAnyFormSubmitting = React.useMemo(
    () => Object.values<FormItem>(forms).some((formItem) => formItem.isSubmitting),
    [forms]
  );

  const submitAll = React.useCallback(
    async (onlyDirty?: boolean) => {
      for (const formName in forms) {
        const formItem = forms[formName];
        const form = formItem.form;

        const valid = await form.trigger();

        if (!valid) {
          return;
        }
      }

      const submitPromises = [];

      for (const formName in forms) {
        const formItem = forms[formName];
        const form = formItem.form;

        const isFormDirty =
          form.formState.dirtyFields && Object.keys(form.formState.dirtyFields).length > 0;

        if (isFormDirty || !onlyDirty) {
          submitPromises.push(formItem.onSubmit());
        }
      }

      Promise.all(submitPromises).then(() => {
        for (const formName in forms) {
          const values = forms[formName].form.getValues();
          forms[formName].form.reset(values, { keepDirty: false });
        }
      });
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
      sharedForm,
    }),
    [isAnyFormDirty, isAnyFormSubmitting, forms, resetAll, submitAll, sharedForm]
  );

  return <MultiFormContext.Provider value={value}>{children}</MultiFormContext.Provider>;
};
