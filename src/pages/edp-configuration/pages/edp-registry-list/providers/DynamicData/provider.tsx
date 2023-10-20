import React from 'react';
import { useStreamEDPConfigMap } from '../../../../../../k8s/ConfigMap/hooks/useStreamCDPipelineStage';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
    const EDPConfigMap = useStreamEDPConfigMap({
        namespace: getDefaultNamespace(),
    });

    const DataContextValue = React.useMemo(
        () => ({
            EDPConfigMap,
        }),
        [EDPConfigMap]
    );

    return (
        <DynamicDataContext.Provider value={DataContextValue}>
            {children}
        </DynamicDataContext.Provider>
    );
};
