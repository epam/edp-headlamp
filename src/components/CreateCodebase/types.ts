export interface CreateCodebaseProps {
    type: string;
    createDialogOpen?: boolean;
    onClose?(): void;
    setCreateDialogOpen?(boolean): void;
    setIsApplying?(boolean): void;
    isApplying?: boolean;
}

export interface CodebaseAuthData {
    repositoryLogin: string;
    repositoryPasswordOrApiToken: string;
}
