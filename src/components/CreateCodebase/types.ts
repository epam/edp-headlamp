export interface CreateCodebaseProps {
    createDialogOpen?: boolean;
    onClose?(): void;
    setCreateDialogOpen?(boolean): void;
}

export interface CodebaseAuthData {
    repositoryLogin: string;
    repositoryPasswordOrApiToken: string;
}
