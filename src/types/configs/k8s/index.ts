export interface KubeObjectConfig {
    name: {
        singularForm: string;
        pluralForm: string;
    };
    group: string;
    version: string;
}
