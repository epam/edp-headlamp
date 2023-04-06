import { KubeObjectConfig } from '../../types/configs/k8s';

export const TriggerTemplateKubeObjectConfig: KubeObjectConfig = {
    kind: 'TriggerTemplate',
    name: {
        singularForm: 'triggertemplate',
        pluralForm: 'triggertemplates',
    },
    group: 'triggers.tekton.dev',
    version: 'v1beta1',
};
