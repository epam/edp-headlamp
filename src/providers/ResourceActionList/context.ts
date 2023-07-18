import React from 'react';
import { ResourceActionListContextProviderValue } from './types';

export const ResourceActionListContext = React.createContext<
    ResourceActionListContextProviderValue<any>
>({
    anchorEl: null,
    data: null,
    isDetailsPage: false,
    handleOpenResourceActionListMenu: () => {},
    handleCloseResourceActionListMenu: () => {},
});
