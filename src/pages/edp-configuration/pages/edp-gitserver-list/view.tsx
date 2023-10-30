import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { StatusIcon } from '../../../../components/StatusIcon';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { FORM_MODES } from '../../../../types/forms';
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

    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;
                const connected = el?.status?.connected;
                const [icon, color] = EDPGitServerKubeObject.getStatusIcon(connected);
                const error = el?.status?.error;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: (
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item style={{ marginRight: rem(5) }}>
                                <StatusIcon
                                    icon={icon}
                                    color={color}
                                    Title={
                                        <>
                                            <Typography
                                                variant={'subtitle2'}
                                                style={{ fontWeight: 600 }}
                                            >
                                                {`Connected: ${
                                                    connected === undefined ? 'Unknown' : connected
                                                }`}
                                            </Typography>
                                            <Render condition={!!error}>
                                                <Typography
                                                    variant={'subtitle2'}
                                                    style={{ marginTop: rem(10) }}
                                                >
                                                    {error}
                                                </Typography>
                                            </Render>
                                        </>
                                    }
                                />
                            </Grid>
                            <Grid item>{el?.metadata.name}</Grid>
                        </Grid>
                    ),
                    ownerReference,
                    component: (
                        <ManageGitServer
                            formData={{
                                currentElement: el.jsonData,
                                mode: FORM_MODES.EDIT,
                            }}
                        />
                    ),
                };
            }),
        [secretsArray]
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
                            mode: FORM_MODES.CREATE,
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
