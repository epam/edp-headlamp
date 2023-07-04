import { React } from '../../plugin.globals';
import { VIEW_MODES, ViewModeContextProviderValue } from './types';

export const ViewModeContext = React.createContext<ViewModeContextProviderValue>({
    entityID: null,
    viewMode: VIEW_MODES.TABLE,
    handleChangeViewMode: () => {
        //
    },
});
