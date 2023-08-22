import React from 'react';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
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

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: el?.metadata.name,
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
        [secretsArray]
    );

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
            })}
            items={configurationItemList}
            emptyMessage={'No Git Servers found'}
        />
    );
};
