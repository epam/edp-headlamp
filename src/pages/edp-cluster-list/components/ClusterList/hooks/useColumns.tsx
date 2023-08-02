import React from 'react';
import { TableColumn } from '../../../../../components/Table/types';
import { SecretKubeObjectInterface } from '../../../../../k8s/Secret/types';

export const useColumns = (): TableColumn<SecretKubeObjectInterface>[] => {
    return React.useMemo(
        () => [
            {
                id: 'name',
                label: 'Name',
                render: ({ data: { name } }) => atob(unescape(name)),
                width: '30%',
            },
            {
                id: 'host',
                label: 'Host',
                render: ({ data: { server } }) => atob(unescape(server)),
            },
        ],
        []
    );
};
