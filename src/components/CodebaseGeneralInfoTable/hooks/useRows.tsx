import React from 'react';
import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../types/global';
import { NameValueTableRow } from '../../HeadlampNameValueTable/types';

export const useRows = (kubeObjectData: DeepPartial<EDPCodebaseKubeObjectInterface>) =>
    React.useMemo(() => {
        const { spec, status } = kubeObjectData;
        const base: NameValueTableRow[] = [
            {
                name: 'Status',
                value: status?.status,
            },
            {
                name: 'Language',
                value: spec.lang,
            },
            {
                name: 'Build tool',
                value: spec.buildTool,
            },
            {
                name: 'Framework',
                value: spec.framework,
            },
            {
                name: 'Strategy',
                value: spec.strategy,
            },
            {
                name: 'Versioning type',
                value: spec.versioning.type,
            },
        ];

        if (spec.versioning.type === CODEBASE_VERSIONING_TYPES['EDP']) {
            base.push({
                name: 'Start versioning from',
                value: spec.versioning.startFrom,
            });
        }

        return base;
    }, [kubeObjectData]);
