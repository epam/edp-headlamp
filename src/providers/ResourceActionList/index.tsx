import React from 'react';
import { ResourceActionListContext } from './context';
import { ResourceActionListContextProviderValue } from './types';

export const ResourceActionListContextProvider: React.FC = ({ children }) => {
    const [data, setData] = React.useState<unknown>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [isDetailsPage, setIsDetailsPage] = React.useState<boolean>(false);

    const handleOpenResourceActionListMenu: ResourceActionListContextProviderValue['handleOpenResourceActionListMenu'] =
        React.useCallback(
            (anchorEl, kubeObject, isDetailsPage) => {
                setAnchorEl(anchorEl);
                setData(kubeObject);

                if (isDetailsPage) {
                    setIsDetailsPage(true);
                }
            },
            [setAnchorEl]
        );

    const handleCloseResourceActionListMenu = React.useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    return (
        <ResourceActionListContext.Provider
            value={{
                anchorEl,
                data,
                isDetailsPage,
                handleCloseResourceActionListMenu,
                handleOpenResourceActionListMenu,
            }}
        >
            {children}
        </ResourceActionListContext.Provider>
    );
};
