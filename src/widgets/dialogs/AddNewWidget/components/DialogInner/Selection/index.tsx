import { Icon } from '@iconify/react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MainRadioGroup } from '../../../../../../providers/Form/components/MainRadioGroup';
import { WIDGET_TYPE } from '../../../constants';

export const Selection = ({
  form,
}: {
  form: UseFormReturn<Record<'widgetType', string>, any, undefined>;
}) => {
  return (
    <MainRadioGroup
      {...form.register('widgetType')}
      control={form.control}
      errors={form.formState.errors}
      options={[
        {
          value: WIDGET_TYPE.APP_VERSION,
          label: 'Application Deployed Versions',
          description:
            'Displays the deployed versions of the application found in all the Environments.',
          icon: <Icon icon={'f7:table'} width={24} height={24} color="#002446" />,
          checkedIcon: <Icon icon={'f7:table'} width={24} height={24} color="#002446" />,
        },
      ]}
      gridItemSize={12}
    />
  );
};
