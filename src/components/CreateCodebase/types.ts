export interface CreateCodebaseProps {
    type: string;
    createDialogOpen?: boolean;
    onClose?(): void;
    setCreateDialogOpen?(boolean): void;
}

export interface CodebaseAuthData {
    repositoryLogin: string;
    repositoryPasswordOrApiToken: string;
}
