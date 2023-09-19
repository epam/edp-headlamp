import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { StatusIcon } from '../../../../components/StatusIcon';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { rem } from '../../../../utils/styling/rem';
import { ManageGitServer } from '../../../../widgets/ManageGitServer';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { GIT_SERVER_LIST_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const [items] = EDPGitServerKubeObject.useList({
        namespace: getDefaultNamespace(),
    });

    const secretsArray = React.useMemo(() => (items ? items.filter(Boolean) : []), [items]);

    const firstGitServer = items?.[0];

    const available =
        firstGitServer?.status?.available === true
            ? CUSTOM_RESOURCE_STATUSES.AVAILABLE
            : firstGitServer?.status?.available === false
            ? CUSTOM_RESOURCE_STATUSES.UNAVAILABLE
            : CUSTOM_RESOURCE_STATUSES.UNKNOWN;
    const status = firstGitServer?.status?.status;

    const statusTitle = React.useMemo(
        () => (
            <>
                <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                    {capitalizeFirstLetter(available)}
                </Typography>
                <Render condition={status === CUSTOM_RESOURCE_STATUSES.FAILED}>
                    <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                        {firstGitServer?.status?.detailedMessage}
                    </Typography>
                </Render>
            </>
        ),
        [available, firstGitServer, status]
    );

    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: (
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item style={{ marginRight: rem(5) }}>
                                <StatusIcon status={available} customTitle={statusTitle} />
                            </Grid>
                            <Grid item>{el?.metadata.name}</Grid>
                        </Grid>
                    ),
                    ownerReference,
                    component: (
                        <ManageGitServer
                            formData={{
                                currentElement: el,
                                isReadOnly: true,
                            }}
                        />
                    ),
                };
            }),
        [available, secretsArray, statusTitle]
    );

    const creationDisabled = React.useMemo(() => items === null || items.length >= 1, [items]);

    return (
        <ConfigurationBody
            pageData={{
                label: GIT_SERVER_LIST_PAGE_DESCRIPTION.label,
                description: GIT_SERVER_LIST_PAGE_DESCRIPTION.description,
                docUrl: EDP_USER_GUIDE.GIT_SERVER_MANAGE.anchors.VIEW_DATA.url,
            }}
            renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                title: 'Create Git Server',
                component: (
                    <ManageGitServer
                        formData={{
                            currentElement: 'placeholder',
                            handleClosePlaceholder,
                        }}
                    />
                ),
                disabled: creationDisabled,
            })}
            items={items === null ? null : configurationItemList}
            emptyMessage={'No Git Servers found'}
        />
    );
};
