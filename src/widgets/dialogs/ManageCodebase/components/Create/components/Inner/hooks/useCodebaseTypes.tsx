import { Icon } from '@iconify/react';
import React from 'react';
import { CODEBASE_TYPE } from '../../../../../../../../constants/codebaseTypes';
import { MainRadioGroupOption } from '../../../../../../../../providers/Form/components/MainRadioGroup/types';

export const useCodebaseTypeOptions = (): MainRadioGroupOption[] => {
  return [
    {
      value: CODEBASE_TYPE.INFRASTRUCTURE,
      label: 'Infrastructure',
      description:
        'Deploys and manages the infrastructure components in cloud environments using Infrastructure as Code (IaC) approach. Manage, Version and Promote your IaC environments here.',
      icon: <Icon icon={'tabler:cloud-code'} width={24} height={24} color="#002446" />,
      checkedIcon: <Icon icon={'tabler:cloud-code'} width={24} height={24} color="#002446" />,
    },
    {
      value: CODEBASE_TYPE.APPLICATION,
      label: 'Application',
      description:
        "Deploys services and includes configuration files, deployment scripts, and other resources needed to create and manage the application's infrastructure.",
      icon: <Icon icon={'tdesign:app'} width={24} height={24} color="#002446" />,
      checkedIcon: <Icon icon={'tdesign:app'} width={24} height={24} color="#002446" />,
    },
    {
      value: CODEBASE_TYPE.LIBRARY,
      label: 'Library',
      description:
        'Provides reusable code that can be incorporated into services. It includes additional functions, modules that might be shared across services.',
      icon: <Icon icon={'majesticons:library-line'} width={24} height={24} color="#002446" />,
      checkedIcon: (
        <Icon icon={'majesticons:library-line'} width={24} height={24} color="#002446" />
      ),
    },
    {
      value: CODEBASE_TYPE.AUTOTEST,
      label: 'Autotest',
      description: 'Onboard and start defining Quality Gate for deployment pipelines here.',
      icon: <Icon icon={'fluent-mdl2:test-auto-solid'} width={24} height={24} color="#002446" />,
      checkedIcon: (
        <Icon icon={'fluent-mdl2:test-auto-solid'} width={24} height={24} color="#002446" />
      ),
    },
  ];
};
