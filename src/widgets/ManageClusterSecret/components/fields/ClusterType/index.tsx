import { Icon } from '@iconify/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { FormRadioGroup } from '../../../../../providers/Form/components/FormRadioGroup';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FieldEvent, FORM_MODES } from '../../../../../types/forms';
import { CLUSTER_TYPE } from '../../../constants';
import { ManageClusterSecretDataContext } from '../../../types';

interface ClusterTypeProps {
  onChange?: (event: FieldEvent) => void;
  value?: string;
}

export const ClusterType = ({ onChange, value }: ClusterTypeProps) => {
  const {
    control,
    formState: { errors },
    register,
  } = useForm();

  const {
    formData: { mode },
  } = useFormContext<ManageClusterSecretDataContext>();

  return (
    <FormRadioGroup
      {...register('clusterType', {
        required: `Select codebase language`,
        onChange: onChange,
      })}
      name="clusterType"
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
      defaultValue={value}
    />
  );
};
