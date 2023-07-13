import { Icon } from '@iconify/react';
import { Link, Typography } from '@material-ui/core';
import React from 'react';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { Render } from '../../../../../components/Render';
import { EDPComponentKubeObjectInterface } from '../../../../../k8s/EDPComponent/types';
import { HeadlampKubeObject } from '../../../../../types/k8s';
import { sortByName } from '../../../../../utils/sort/sortByName';

export const useColumns = (classes: {
    [key: string]: string;
}): HeadlampSimpleTableGetterColumn<HeadlampKubeObject<EDPComponentKubeObjectInterface>>[] =>
    React.useMemo(
        () => [
            {
                label: 'Icon',
                getter: ({ spec: { url, visible, icon } }) => (
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
            },
            {
                label: 'Name',
                getter: ({ spec: { url, type, visible } }) => {
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
                sort: (a, b) => sortByName(a.spec.type, b.spec.type),
            },
            {
                label: 'Namespace',
                getter: ({ metadata: { namespace } }) => <>{namespace}</>,
                sort: (a, b) => sortByName(a.metadata.namespace, b.metadata.namespace),
            },
        ],
        [classes]
    );
