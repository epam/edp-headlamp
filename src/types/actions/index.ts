export interface KubeObjectAction {
    name: string;
    label: string;
    disabled?: {
        status: boolean;
        reason?: string;
    };
    action: (e: React.SyntheticEvent) => void;
    icon?: string;
}
