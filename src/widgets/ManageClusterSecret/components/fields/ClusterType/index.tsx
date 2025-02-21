import { Icon } from '@iconify/react';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { FormRadioGroup } from '../../../../../providers/Form/components/FormRadioGroup';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { CLUSTER_TYPE } from '../../../constants';
import { CLUSTER_FORM_NAMES } from '../../../names';
import { ManageClusterSecretDataContext, ManageClusterSecretValues } from '../../../types';

export const ClusterType = () => {
  const {
    control,
    formState: { errors },
  } = useReactHookFormContext<ManageClusterSecretValues>();

  const {
    formData: { mode },
  } = useFormContext<ManageClusterSecretDataContext>();

  return (
    <FormRadioGroup
      name={CLUSTER_FORM_NAMES.CLUSTER_TYPE}
      control={control}
      errors={errors}
      options={[
        {
          label: 'Bearer',
          value: CLUSTER_TYPE.BEARER,
          icon: <Icon icon={ICONS.KUBERNETES} />,
          checkedIcon: <Icon icon={ICONS.KUBERNETES} />,
        },
        {
          label: 'IRSA',
          value: CLUSTER_TYPE.IRSA,
          icon: <Icon icon={ICONS.KEY} />,
          checkedIcon: <Icon icon={ICONS.KEY} />,
        },
      ]}
      label="Cluster Type"
      disabled={mode === FORM_MODES.EDIT}
    />
  );
};
