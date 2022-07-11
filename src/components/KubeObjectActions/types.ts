export interface KubeObjectAction {
    name: string;
    label: string;
    disabled?: boolean;
    action: (any) => void;
}

export interface KubeObjectActionsProps {
    actions: KubeObjectAction[];
    tooltipOpen: boolean;
    setTooltipOpen(boolean): void;
}
