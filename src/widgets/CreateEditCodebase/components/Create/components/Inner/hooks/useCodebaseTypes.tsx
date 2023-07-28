import { Icon } from '@iconify/react';
import React from 'react';
import { CODEBASE_TYPES } from '../../../../../../../constants/codebaseTypes';
import { MainRadioGroupOption } from '../../../../../../../providers/Form/components/MainRadioGroup/types';

export const useCodebaseTypeOptions = (): MainRadioGroupOption[] => {
    return [
        {
            value: CODEBASE_TYPES.INFRASTRUCTURE,
            label: 'Infrastructure',
            description:
                'Deploys and manages the infrastructure components in cloud environments using Infrastructure as Code (IaC) approach. Manage, Version and Promote your IaC environments here.',
            icon: <Icon icon={'tabler:cloud-code'} width={40} height={40} />,
            checkedIcon: <Icon icon={'tabler:cloud-code'} width={40} height={40} />,
        },
        {
            value: CODEBASE_TYPES.APPLICATION,
            label: 'Application',
            description:
                "Deploys services and includes configuration files, deployment scripts, and other resources needed to create and manage the application's infrastructure.",
            icon: <Icon icon={'mdi:application-braces-outline'} width={40} height={40} />,
            checkedIcon: <Icon icon={'mdi:application-braces-outline'} width={40} height={40} />,
        },
        {
            value: CODEBASE_TYPES.LIBRARY,
            label: 'Library',
            description:
                'Provides reusable code that can be incorporated into services. It includes additional functions, modules that might be shared across services.',
            icon: <Icon icon={'mdi:application-brackets-outline'} width={40} height={40} />,
            checkedIcon: <Icon icon={'mdi:application-brackets-outline'} width={40} height={40} />,
        },
        {
            value: CODEBASE_TYPES.AUTOTEST,
            label: 'Autotest',
            description: 'Onboard and start defining Quality Gate for deployment pipelines here.',
            icon: <Icon icon={'file-icons:test-generic'} width={40} height={40} />,
            checkedIcon: <Icon icon={'file-icons:test-generic'} width={40} height={40} />,
        },
    ];
};
