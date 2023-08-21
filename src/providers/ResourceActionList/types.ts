export interface ResourceActionListContextProviderValue<DataType = unknown> {
    anchorEl: HTMLElement | null;
    data: DataType;
    handleOpenResourceActionListMenu: (
        anchorEl: ResourceActionListContextProviderValue['anchorEl'],
        data: ResourceActionListContextProviderValue['data']
    ) => void;
    handleCloseResourceActionListMenu: () => void;
}
