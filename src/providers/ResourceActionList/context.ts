import { React } from '../../plugin.globals';
import { ResourceActionListContextProviderValue } from './types';

export const ResourceActionListContext =
    React.createContext<ResourceActionListContextProviderValue>({
        anchorEl: null,
        kubeObject: null,
        isDetailsPage: false,
        handleOpenResourceActionListMenu: () => {},
        handleCloseResourceActionListMenu: () => {},
    });
