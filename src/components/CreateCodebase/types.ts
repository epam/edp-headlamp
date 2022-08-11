export interface CreateCodebaseProps {
    type: string;
    open: boolean;
    onClose(): void;
    setOpen(boolean): void;
    namespace: string;
}
