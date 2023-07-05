import React from 'react';
import { ViewModeContext } from './context';
import { VIEW_MODES, ViewMode, ViewModeContextProviderProps } from './types';

export const ViewModeContextProvider: React.FC<ViewModeContextProviderProps> = ({
    children,
    entityID,
}) => {
    const [viewMode, setViewMode] = React.useState<ViewMode>(
        () =>
            (JSON.parse(localStorage.getItem(`VIEW_MODE::${entityID}`)) as ViewMode) ||
            VIEW_MODES.TABLE
    );

    const handleChangeViewMode = React.useCallback(
        (viewMode: ViewMode) => {
            localStorage.setItem(`VIEW_MODE::${entityID}`, JSON.stringify(viewMode));
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
