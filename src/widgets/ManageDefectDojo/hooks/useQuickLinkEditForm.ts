import React from 'react';
import { useForm } from 'react-hook-form';
import { editResource } from '../../../k8s/common/editResource';
import { useQuickLinkCRUD } from '../../../k8s/QuickLink/hooks/useQuickLinkCRUD';
import { QuickLinkKubeObjectInterface } from '../../../k8s/QuickLink/types';
import { QUICK_LINK_FORM_NAMES } from '../names';
import { QuickLinkFormValues } from '../types';

export const useQuickLinkEditForm = ({
  quickLink,
}: {
  quickLink: QuickLinkKubeObjectInterface;
}) => {
  const {
    editQuickLink,
    mutations: { QuickLinkEditMutation },
  } = useQuickLinkCRUD({});

  const defaultValues = React.useMemo(
    () => ({
      [QUICK_LINK_FORM_NAMES.externalUrl.name]: quickLink?.spec.url,
    }),
    [quickLink?.spec.url]
  );

  const form = useForm<QuickLinkFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  const handleSubmit = React.useCallback(
    async (values: QuickLinkFormValues) => {
      const newQuickLinkData = editResource(QUICK_LINK_FORM_NAMES, quickLink, values);

      await editQuickLink({
        QuickLinkData: newQuickLinkData,
      });
    },
    [quickLink, editQuickLink]
  );

  return React.useMemo(
    () => ({ form, mutation: QuickLinkEditMutation, handleSubmit }),
    [form, QuickLinkEditMutation, handleSubmit]
  );
};
