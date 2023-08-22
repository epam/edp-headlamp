import React from 'react';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { ARGO_CD_SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageClusterSecret } from '../../../../widgets/ManageClusterSecret';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { CLUSTER_LIST_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const [items] = SecretKubeObject.useList({
        namespace: getDefaultNamespace(),
        labelSelector: `${ARGO_CD_SECRET_LABEL_SECRET_TYPE}=cluster`,
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
                        <ManageClusterSecret
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
                label: CLUSTER_LIST_PAGE_DESCRIPTION.label,
                description: CLUSTER_LIST_PAGE_DESCRIPTION.description,
                docUrl: EDP_USER_GUIDE.MANAGE_CLUSTER.anchors.VIEW_DATA.url,
            }}
            renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                title: 'Add Cluster',
                component: (
                    <ManageClusterSecret
                        formData={{
                            currentElement: 'placeholder',
                            handleClosePlaceholder,
                        }}
                    />
                ),
            })}
            items={configurationItemList}
            emptyMessage={'No Cluster secrets found'}
        />
    );
};
