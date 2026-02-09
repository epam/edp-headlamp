import React from 'react';
import { SECRET_LABEL_CLUSTER_TYPE } from '../../../../../k8s/groups/default/Secret/labels';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { CLUSTER_TYPE } from '../../../constants';
import { CLUSTER_FORM_NAMES } from '../../../names';
import { ManageClusterSecretDataContext } from '../../../types';
import { getClusterName } from '../../../utils';

const parseConfigJson = (configJson: string) => {
  const decodedConfigJson = safeDecode(configJson);
  return decodedConfigJson ? JSON.parse(decodedConfigJson) : {};
};

export const useDefaultValues = ({ formData }: { formData: ManageClusterSecretDataContext }) => {
  const { currentElement } = formData;

  const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

  return React.useMemo(() => {
    if (isPlaceholder || !currentElement) {
      return {};
    }

    const clusterType =
      currentElement.metadata?.labels?.[SECRET_LABEL_CLUSTER_TYPE] ?? CLUSTER_TYPE.BEARER;

    const clusterName = getClusterName(currentElement);

    if (clusterType === CLUSTER_TYPE.BEARER) {
      const config = parseConfigJson(currentElement.data?.config);

      return {
        [CLUSTER_FORM_NAMES.CLUSTER_TYPE]: CLUSTER_TYPE.BEARER,
        [CLUSTER_FORM_NAMES.CLUSTER_NAME]: clusterName,
        [CLUSTER_FORM_NAMES.CLUSTER_HOST]: config?.clusters[0]?.cluster?.server,
        [CLUSTER_FORM_NAMES.CLUSTER_CERTIFICATE]:
          config?.clusters[0]?.cluster?.['certificate-authority-data'],
        [CLUSTER_FORM_NAMES.SKIP_TLS_VERIFY]:
          config?.clusters[0]?.cluster?.['insecure-skip-tls-verify'],
        [CLUSTER_FORM_NAMES.CLUSTER_TOKEN]: config?.users[0]?.user?.token,
      };
    } else {
      const parsedData = parseConfigJson(currentElement.data.config);

      return {
        [CLUSTER_FORM_NAMES.CLUSTER_TYPE]: CLUSTER_TYPE.IRSA,
        [CLUSTER_FORM_NAMES.CLUSTER_NAME]: clusterName,
        [CLUSTER_FORM_NAMES.CLUSTER_HOST]: safeDecode(currentElement.data.server),
        [CLUSTER_FORM_NAMES.ROLE_ARN]: parsedData?.awsAuthConfig?.roleARN,
        [CLUSTER_FORM_NAMES.CA_DATA]: parsedData?.tlsClientConfig?.caData,
      };
    }
  }, [currentElement, isPlaceholder]);
};
