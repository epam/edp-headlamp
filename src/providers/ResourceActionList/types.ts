export interface ResourceActionListContextProviderValue<DataType = unknown> {
    anchorEl: HTMLElement | null;
    data: DataType;
    isDetailsPage?: boolean;
    handleOpenResourceActionListMenu: (
        anchorEl: ResourceActionListContextProviderValue['anchorEl'],
        data: ResourceActionListContextProviderValue['data'],
        isDetailsPage?: ResourceActionListContextProviderValue['isDetailsPage']
    ) => void;
    handleCloseResourceActionListMenu: () => void;
}
