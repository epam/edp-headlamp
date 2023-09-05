import React from 'react';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
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
                    title: 'GitOps',
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
        [itemsArray]
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
            items={configurationItemList}
            emptyMessage={'No Custom Values found'}
        />
    );
};
