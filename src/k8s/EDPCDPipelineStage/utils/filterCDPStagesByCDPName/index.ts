import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export const filterCDPStagesByCDPName = (
    data: KubeObjectInterface[],
    name: string
): KubeObjectInterface[] => data.filter(el => el.spec.cdPipeline === name);
