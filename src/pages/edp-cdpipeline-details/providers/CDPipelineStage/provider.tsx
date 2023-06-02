import { React } from '../../../../plugin.globals';
import { CDPipelineStageContext } from './context';
import { CDPipelineStageContextProviderProps } from './types';

export const CDPipelineStageContextProvider: React.FC<CDPipelineStageContextProviderProps> = ({
    children,
    stage,
}) => {
    return (
        <CDPipelineStageContext.Provider value={{ stage }}>
            {children}
        </CDPipelineStageContext.Provider>
    );
};
