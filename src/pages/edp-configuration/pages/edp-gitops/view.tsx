import { Grid } from '@material-ui/core';
import React from 'react';
import { ResourceIconLink } from '../../../../components/ResourceIconLink';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE } from '../../../../k8s/EDPCodebase/labels';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
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

    const configurationItemList = React.useMemo(
        () =>
            itemsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: (
                        <Grid container spacing={1} alignItems={'center'}>
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
        [gitOpsCodebase, itemsArray]
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
