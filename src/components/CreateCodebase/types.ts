export interface CreateCodebaseProps {
    type: string;
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
}

export interface CodebaseAuthData {
    repositoryLogin: string;
    repositoryPasswordOrApiToken: string;
}
