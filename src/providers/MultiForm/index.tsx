import React from 'react';
import { MultiFormContext } from './context';
import { FormItem } from './types';

export const MultiFormContextProvider = ({ children }) => {
  const [forms, setForms] = React.useState<{ [formName: string]: FormItem }>({});

  const registerForm = React.useCallback((formName: string, form: FormItem) => {
    setForms((prev) => ({ ...prev, [formName]: form }));
  }, []);

  const unregisterForm = React.useCallback((formName: string) => {
    setForms((prev) => {
      // eslint-disable-next-line no-unused-vars
      const { [formName]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const resetAll = React.useCallback(() => {
    Object.values(forms).forEach((form) => form.reset());
  }, [forms]);

  const isAnyFormDirty = Object.values(forms).some((form) => form.formState.isDirty);

  const value = React.useMemo(
    () => ({ registerForm, unregisterForm, resetAll, isAnyFormDirty }),
    [isAnyFormDirty, registerForm, resetAll, unregisterForm]
  );

  return <MultiFormContext.Provider value={value}>{children}</MultiFormContext.Provider>;
};
