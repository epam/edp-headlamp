import { Icon } from '@iconify/react';
import { Link, Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../../components/Render';
import { TableColumn } from '../../../../../components/Table/types';
import { EDPComponentKubeObjectInterface } from '../../../../../k8s/EDPComponent/types';
import { HeadlampKubeObject } from '../../../../../types/k8s';

export const useColumns = (classes: {
    [key: string]: string;
}): TableColumn<HeadlampKubeObject<EDPComponentKubeObjectInterface>>[] =>
    React.useMemo(
        () => [
            {
                id: 'icon',
                label: 'Icon',
                render: ({ spec: { url, visible, icon } }) => (
                    <>
                        <Render condition={!!visible}>
                            <Link href={url} target="_blank" rel="noopener">
                                <span className={classes.serviceItemIcon}>
                                    <img src={`data:image/svg+xml;base64,${icon}`} alt="" />
                                </span>
                            </Link>
                        </Render>
                        <Render condition={!visible}>
                            <Icon
                                icon={'ph:placeholder-light'}
                                className={classes.serviceItemIcon}
                            />
                        </Render>
                    </>
                ),
                width: '5%',
            },
            {
                id: 'name',
                label: 'Name',
                columnSortableValuePath: 'spec.type',
                render: ({ spec: { url, type, visible } }) => {
                    const _url = !/^https?:\/\//i.test(url) ? `https://${url}` : url;

                    return (
                        <>
                            <Render condition={!!visible}>
                                <Link href={_url} target="_blank" rel="noopener">
                                    {type}
                                </Link>
                            </Render>
                            <Render condition={!visible}>
                                <Typography>{type}</Typography>
                            </Render>
                        </>
                    );
                },
                width: '30%',
            },
            {
                id: 'namespace',
                label: 'Namespace',
                columnSortableValuePath: 'metadata.namespace',
                render: ({ metadata: { namespace } }) => <>{namespace}</>,
            },
        ],
        [classes]
    );
