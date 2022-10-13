export interface CreateCDPipelineProps {
    createDialogOpen?: boolean;
    onClose?(): void;
    setCreateDialogOpen?(boolean): void;
    setIsApplying?(boolean): void;
    isApplying?: boolean;
}
