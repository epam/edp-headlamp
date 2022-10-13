export interface CreateGitServerProps {
    createDialogOpen?: boolean;
    onClose?(): void;
    setCreateDialogOpen?(boolean): void;
    setIsApplying?(boolean): void;
    isApplying?: boolean;
}
