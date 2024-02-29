import React from 'react';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { CLUSTER_CREATION_FORM_NAMES } from '../../../names';
import { ManageClusterSecretDataContext } from '../../../types';

const parseConfigJson = (configJson: string) => {
  const decodedConfigJson = safeDecode(configJson);
  return JSON.parse(decodedConfigJson);
};

export const useDefaultValues = ({ formData }: { formData: ManageClusterSecretDataContext }) => {
  const { currentElement } = formData;

  const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

  return React.useMemo(() => {
    if (isPlaceholder || !currentElement) {
      return {};
    }

    const config = parseConfigJson(currentElement?.data?.config);

    return {
      [CLUSTER_CREATION_FORM_NAMES.clusterName.name]: currentElement.metadata.name,
      [CLUSTER_CREATION_FORM_NAMES.clusterHost.name]: config?.clusters[0]?.cluster?.server,
      [CLUSTER_CREATION_FORM_NAMES.clusterCertificate.name]:
        config?.clusters[0]?.cluster?.['certificate-authority-data'],
      [CLUSTER_CREATION_FORM_NAMES.skipTLSVerify.name]:
        config?.clusters[0]?.cluster?.['insecure-skip-tls-verify'],
      [CLUSTER_CREATION_FORM_NAMES.clusterToken.name]: config?.users[0]?.user?.token,
    };
  }, [currentElement, isPlaceholder]);
};
