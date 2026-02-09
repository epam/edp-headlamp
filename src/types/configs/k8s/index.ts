export interface KubeObjectConfig {
  kind: string;
  name: {
    singularForm: string;
    pluralForm: string;
  };
  group?: string;
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
