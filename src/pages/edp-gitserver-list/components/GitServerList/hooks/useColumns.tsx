import { Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../../components/Render';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import {
    CUSTOM_RESOURCE_ACTIVE_STATUSES,
    CUSTOM_RESOURCE_STATUSES,
} from '../../../../../constants/statuses';
import { EDPGitServerKubeObjectInterface } from '../../../../../k8s/EDPGitServer/types';
import { HeadlampKubeObject } from '../../../../../types/k8s';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { rem } from '../../../../../utils/styling/rem';

export const useColumns = (): TableColumn<HeadlampKubeObject<EDPGitServerKubeObjectInterface>>[] =>
    React.useMemo(
        () => [
            {
                id: 'status',
                label: 'Status',
                columnSortableValuePath: 'status.value',
                render: gitServerKubeObject => {
                    const status = gitServerKubeObject?.status
                        ? gitServerKubeObject?.status?.value
                        : CUSTOM_RESOURCE_ACTIVE_STATUSES['UNKNOWN'];

                    const statusTitle = (
                        <>
                            <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                {capitalizeFirstLetter(status)}
                            </Typography>
                            <Render condition={status === CUSTOM_RESOURCE_STATUSES['FAILED']}>
                                <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                                    {gitServerKubeObject?.status?.detailed_message}
                                </Typography>
                            </Render>
                        </>
                    );

                    return <StatusIcon status={status} customTitle={statusTitle} />;
                },
                width: '5%',
            },
            {
                id: 'name',
                label: 'Name',
                columnSortableValuePath: 'metadata.name',
                render: ({ metadata: { name } }) => name,
                width: '20%',
            },
            {
                id: 'gitHost',
                label: 'Git Host',
                columnSortableValuePath: 'spec.gitHost',
                render: ({ spec: { gitHost } }) => gitHost,
                width: '30%',
            },
            {
                id: 'gitUser',
                label: 'Git User',
                columnSortableValuePath: 'spec.gitUser',
                render: ({ spec: { gitUser } }) => gitUser,
                width: '10%',
            },
            {
                id: 'httpsPort',
                label: 'HTTPS Port',
                columnSortableValuePath: 'spec.httpsPort',
                render: ({ spec: { httpsPort } }) => httpsPort,
                width: '10%',
            },
            {
                id: 'nameSshKeySecret',
                label: 'nameSshKeySecret',
                columnSortableValuePath: 'spec.nameSshKeySecret',
                render: ({ spec: { nameSshKeySecret } }) => nameSshKeySecret,
                width: '25%',
            },
            {
                id: 'sshPort',
                label: 'sshPort',
                columnSortableValuePath: 'spec.sshPort',
                render: ({ spec: { sshPort } }) => sshPort,
            },
        ],
        []
    );
