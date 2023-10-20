import React from 'react';
import { EDP_CONFIG_CONFIG_MAP_NAME } from '../constants';
import { ConfigMapKubeObject } from '../index';
import { ConfigMapKubeObjectInterface } from '../types';

interface UseStreamEDPConfigMapProps {
    namespace: string;
}

export const useStreamEDPConfigMap = ({ namespace }: UseStreamEDPConfigMapProps) => {
    const [EDPConfigMap, setEDPConfigMap] = React.useState<ConfigMapKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = ConfigMapKubeObject.streamList({
            namespace,
            dataHandler: data => {
                const EDPConfigMap = data.find(
                    item => item.metadata.name === EDP_CONFIG_CONFIG_MAP_NAME
                );
                setEDPConfigMap(EDPConfigMap);
            },
            errorHandler: error => console.error(error),
        });

        return () => {
            cancelStream();
        };
    }, [namespace]);

    return EDPConfigMap;
};
