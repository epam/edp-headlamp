import React from 'react';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { ARGO_CD_SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageClusterSecret } from '../../../../widgets/ManageClusterSecret';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { CLUSTER_LIST_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const [items] = SecretKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${ARGO_CD_SECRET_LABEL_SECRET_TYPE}=cluster`,
  });

  const configurationItemList = React.useMemo(() => {
    const secretsArray = items ? items.filter(Boolean) : [];
    return secretsArray.map(el => {
      const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

      return {
        id: el?.metadata?.name || el?.metadata?.uid,
        title: el?.metadata.name,
        ownerReference,
        component: (
          <ManageClusterSecret
            formData={{
              currentElement: el?.jsonData,
              mode: FORM_MODES.EDIT,
            }}
          />
        ),
      };
    });
  }, [items]);

  return (
    <ConfigurationBody
      pageData={{
        label: CLUSTER_LIST_PAGE_DESCRIPTION.label,
        description: CLUSTER_LIST_PAGE_DESCRIPTION.description,
        docUrl: EDP_USER_GUIDE.MANAGE_CLUSTER.url,
      }}
      renderPlaceHolderData={({ handleClosePlaceholder }) => ({
        title: 'Add Cluster',
        component: (
          <ManageClusterSecret
            formData={{
              mode: FORM_MODES.CREATE,
              handleClosePlaceholder,
            }}
          />
        ),
      })}
      items={items === null ? null : configurationItemList}
      emptyMessage={'No Cluster secrets found'}
    />
  );
};
