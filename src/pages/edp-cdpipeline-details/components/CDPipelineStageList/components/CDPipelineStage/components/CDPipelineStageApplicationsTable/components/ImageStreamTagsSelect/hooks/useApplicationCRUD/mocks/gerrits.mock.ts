import { GerritKubeObjectInterface } from '../../../../../../../../../../../../../k8s/Gerrit/types';
import { DeepPartial } from '../../../../../../../../../../../../../types/global';

export const gerritsMock: DeepPartial<GerritKubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Gerrit',
            metadata: {
                name: 'gerrit',
                namespace: 'edp-delivery-vp-dev',
            },
            spec: {
                sshPort: 30005,
            },
        },
    ],
};
