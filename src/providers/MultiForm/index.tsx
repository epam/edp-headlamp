import React from 'react';
import { MultiFormContext } from './context';
import { FormItem, MultiFormContextProviderProps } from './types';

export const MultiFormContextProvider = <FormName extends string>({
  children,
  forms,
  sharedForm,
}: MultiFormContextProviderProps<FormName>) => {
  const resetAll = React.useCallback(async () => {
    const resetPromises = Object.values<FormItem>(forms).map((formItem) =>
      formItem.form.reset({}, { keepDirty: false })
    );
    await Promise.all(resetPromises);
  }, [forms]);

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

        console.log('isFormDirty', isFormDirty, formName, form.formState.dirtyFields, onlyDirty);

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
      sharedForm,
    }),
    [isAnyFormDirty, isAnyFormSubmitting, forms, resetAll, submitAll, sharedForm]
  );

  return <MultiFormContext.Provider value={value}>{children}</MultiFormContext.Provider>;
};
