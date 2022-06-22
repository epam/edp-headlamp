import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export const filterCodebasesByType = (
    data: KubeObjectInterface[],
    type: string
): KubeObjectInterface[] => data.filter(el => el.spec.type === type);
