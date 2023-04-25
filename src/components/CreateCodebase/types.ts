export interface CreateCodebaseProps {
    createDialogOpen?: boolean;
    setCreateDialogOpen?(boolean): void;
}

export interface CodebaseAuthData {
    repositoryLogin: string;
    repositoryPasswordOrApiToken: string;
}
