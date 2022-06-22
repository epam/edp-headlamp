export interface KubeObjectConfig {
    name: {
        singularForm: string;
        pluralForm: string;
    };
    group: string;
    version: string;
    types?: {
        [key: string]: {
            name: {
                singularForm: string;
                pluralForm: string;
            };
        };
    };
}
