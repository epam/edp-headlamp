import { React } from '../../plugin.globals';
import { KubeObjectInterface } from '../../plugin.types';
import { ResourceActionListContext } from './context';

export const ResourceActionListContextProvider: React.FC = ({ children }) => {
    const [kubeObject, setKubeObject] = React.useState<KubeObjectInterface>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [isDetailsPage, setIsDetailsPage] = React.useState<boolean>(false);

    const memoizedKubeObject = React.useMemo(() => kubeObject, [kubeObject]);
    const memoizedAnchorEl = React.useMemo(() => anchorEl, [anchorEl]);
    const memoizedIsDetailsPage = React.useMemo(() => isDetailsPage, [isDetailsPage]);

    const handleOpenResourceActionListMenu = React.useCallback(
        (
            anchorEl: HTMLElement | null,
            kubeObject: KubeObjectInterface,
            isDetailsPage?: boolean
        ) => {
            setAnchorEl(anchorEl);
            setKubeObject(kubeObject);

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
                anchorEl: memoizedAnchorEl,
                kubeObject: memoizedKubeObject,
                isDetailsPage: memoizedIsDetailsPage,
                handleCloseResourceActionListMenu,
                handleOpenResourceActionListMenu,
            }}
        >
            {children}
        </ResourceActionListContext.Provider>
    );
};
