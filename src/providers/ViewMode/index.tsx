import React from 'react';
import { LOCAL_STORAGE_SERVICE } from '../../services/local-storage';
import { ViewModeContext } from './context';
import { VIEW_MODES, ViewMode, ViewModeContextProviderProps } from './types';

export const ViewModeContextProvider: React.FC<ViewModeContextProviderProps> = ({
    children,
    entityID,
}) => {
    const [viewMode, setViewMode] = React.useState<ViewMode>(
        () =>
            (LOCAL_STORAGE_SERVICE.getItem(`VIEW_MODE::${entityID}`) as ViewMode) ||
            VIEW_MODES.TABLE
    );

    const handleChangeViewMode = React.useCallback(
        (viewMode: ViewMode) => {
            LOCAL_STORAGE_SERVICE.setItem(`VIEW_MODE::${entityID}`, viewMode);
            setViewMode(viewMode);
        },
        [entityID]
    );

    return (
        <ViewModeContext.Provider
            value={{
                entityID,
                viewMode,
                handleChangeViewMode,
            }}
        >
            {children}
        </ViewModeContext.Provider>
    );
};
