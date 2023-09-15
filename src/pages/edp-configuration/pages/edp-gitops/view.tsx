import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { ResourceIconLink } from '../../../../components/ResourceIconLink';
import { StatusIcon } from '../../../../components/StatusIcon';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE } from '../../../../k8s/EDPCodebase/labels';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { rem } from '../../../../utils/styling/rem';
import { ManageGitOps } from '../../../../widgets/ManageGitOps';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const [items] = EDPCodebaseKubeObject.useList({
        namespace: getDefaultNamespace(),
        labelSelector: `${CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE}=${CODEBASE_TYPES.SYSTEM}`,
    });

    const itemsArray = React.useMemo(() => (items ? items.filter(Boolean) : []), [items]);

    const gitOpsCodebase = itemsArray.find(el => el.metadata.name === 'edp-gitops') ?? null;

    const status = gitOpsCodebase?.status?.status ?? CUSTOM_RESOURCE_STATUSES.UNKNOWN;

    const statusTitle = React.useMemo(
        () => (
            <>
                <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                    {capitalizeFirstLetter(status)}
                </Typography>
                <Render condition={status === CUSTOM_RESOURCE_STATUSES['FAILED']}>
                    <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                        {gitOpsCodebase?.status?.detailedMessage}
                    </Typography>
                </Render>
            </>
        ),
        [gitOpsCodebase?.status?.detailedMessage, status]
    );

    const configurationItemList = React.useMemo(
        () =>
            itemsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: (
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item style={{ marginRight: rem(5) }}>
                                <StatusIcon status={status} customTitle={statusTitle} />
                            </Grid>
                            <Grid item>GitOps</Grid>
                            <Grid item>
                                <ResourceIconLink
                                    tooltipTitle={'Go to the Source Code'}
                                    link={gitOpsCodebase?.status?.gitWebUrl}
                                    icon={ICONS.GIT_BRANCH}
                                />
                            </Grid>
                        </Grid>
                    ),
                    ownerReference,
                    component: (
                        <ManageGitOps
                            formData={{
                                currentElement: el,
                                isReadOnly: true,
                            }}
                        />
                    ),
                };
            }),
        [gitOpsCodebase, itemsArray, status, statusTitle]
    );

    const creationDisabled = React.useMemo(
        () => (gitOpsCodebase === null ? false : !!gitOpsCodebase),
        [gitOpsCodebase]
    );

    return (
        <ConfigurationBody
            pageData={{
                label: GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION.label,
                description: GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION.description,
            }}
            renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                title: 'Add GitOps Repository',
                disabled: creationDisabled,
                component: (
                    <ManageGitOps
                        formData={{
                            currentElement: 'placeholder',
                            handleClosePlaceholder,
                        }}
                    />
                ),
            })}
            items={items === null ? null : configurationItemList}
            emptyMessage={'No Custom Values found'}
        />
    );
};
