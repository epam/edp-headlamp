import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Stack } from '@mui/material';
import React from 'react';
import { TableColumn } from '../../../../../components/Table/types';
import { HeadlampKubeObject } from '../../../../../types/k8s';

export const useColumns = (): TableColumn<HeadlampKubeObject<KubeObjectInterface>>[] => {
  return React.useMemo(
    () => [
      {
        id: 'name',
        label: 'Name',
        columnSortableValuePath: 'metadata.name',
        render: ({ metadata: { name } }) => name,
        width: '40%',
      },
      {
        id: 'annotations',
        label: 'Annotations',
        render: ({ metadata: { annotations } }) => {
          const filteredAnnotations = Object.entries(annotations).filter(
            ([key]) =>
              key === 'nginx.ingress.kubernetes.io/auth-signin' ||
              key === 'nginx.ingress.kubernetes.io/auth-url'
          );

          return (
            <Stack spacing={1}>
              {filteredAnnotations.map(([key, value]) => (
                <div>
                  {key}
                  {' : '}
                  {value}
                </div>
              ))}
            </Stack>
          );
        },
      },
      {
        id: 'host',
        label: 'Host',
        render: ({ spec }) => {
          return spec.rules[0].host;
        },
      },
    ],
    []
  );
};
