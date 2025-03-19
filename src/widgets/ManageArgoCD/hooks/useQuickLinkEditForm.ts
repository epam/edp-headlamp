import React from 'react';
import { useForm } from 'react-hook-form';
import { editResource } from '../../../k8s/common/editResource';
import { useQuickLinkCRUD } from '../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinkCRUD';
import { QuickLinkKubeObjectInterface } from '../../../k8s/groups/EDP/QuickLink/types';
import { FormItem } from '../../../providers/MultiForm/types';
import { FORM_MODES } from '../../../types/forms';
import { QUICK_LINK_FORM_NAMES } from '../names';
import { QuickLinkFormValues, WidgetPermissions } from '../types';

export const useQuickLinkEditForm = ({
  quickLink,
  permissions,
}: {
  quickLink: QuickLinkKubeObjectInterface;
  permissions: WidgetPermissions;
}): FormItem => {
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
      if (!permissions.update.QuickLink.allowed) {
        return false;
      }

      const newQuickLinkData = editResource(QUICK_LINK_FORM_NAMES, quickLink, values);

      await editQuickLink({
        QuickLinkData: newQuickLinkData,
      });
    },
    [permissions.update.QuickLink.allowed, quickLink, editQuickLink]
  );

  return React.useMemo(
    () => ({
      mode: FORM_MODES.EDIT,
      form,
      onSubmit: form.handleSubmit(handleSubmit),
      isSubmitting: QuickLinkEditMutation.isLoading,
      allowedToSubmit: {
        isAllowed: permissions.update.QuickLink.allowed,
        reason: permissions.update.QuickLink.reason,
      },
    }),
    [
      form,
      handleSubmit,
      QuickLinkEditMutation.isLoading,
      permissions.update.QuickLink.allowed,
      permissions.update.QuickLink.reason,
    ]
  );
};
