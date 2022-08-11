import { pluginLib } from '../../plugin.globals';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { streamResult } from '../common/streamResult';
import { streamResults } from '../common/streamResults';
import { getCDPipelinesStages } from '../EDPCDPipelineStage/getCDPipelinesStages';
import { EDPCDPipelineKubeObjectConfig } from './config';
import { EDPCDPipelineKubeObjectInterface, EDPCDPipelineSpec, EDPCDPipelineStatus } from './types';

const {
    ApiProxy,
    K8s: {
        cluster: { makeKubeObject },
    },
} = pluginLib;
const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPCDPipelineKubeObjectConfig;

export class EDPCDPipelineKubeObject extends makeKubeObject<EDPCDPipelineKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    getDetailsLink(type: string): string {
        return createRouteURL(type, {
            namespace: this.jsonData!.metadata.namespace,
            name: this.jsonData!.metadata.name,
        });
    }

    get spec(): EDPCDPipelineSpec {
        return this.jsonData!.spec;
    }

    get status(): EDPCDPipelineStatus {
        return this.jsonData!.status;
    }
}

export const getCDPipelines = (namespace: string) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return ApiProxy.request(url) as Promise<EDPCDPipelineKubeObjectInterface>;
};

export const streamCDPipeline = (
    name: string,
    namespace: string,
    cb: (data: EDPCDPipelineKubeObjectInterface[]) => void,
    errCb: (err: Error) => void
): any => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResult(url, name, cb, errCb);
};

export const streamCDPipelines = (
    cb: (data: EDPCDPipelineKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return streamResults(url, cb, errCb);
};

export const getCDPipelineByName = async (
    namespace: string,
    cdPipeline: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelines(namespace);
    for (const item of items) {
        if (item.spec.name === cdPipeline) {
            return item;
        }
    }

    return null;
};

export const getCDPipelineByApplicationItUses = async (
    namespace: string,
    codebaseName: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelines(namespace);
    for (const item of items) {
        if (item.spec.applications.includes(codebaseName)) {
            return item;
        }
    }

    return null;
};

export const getCDPipelineByCodebaseBranchItUses = async (
    namespace: string,
    codebaseBranchName: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelines(namespace);
    for (const item of items) {
        if (item.spec.inputDockerStreams.includes(codebaseBranchName)) {
            return item;
        }
    }

    return null;
};

export const getCDPipelineByGroovyLibraryItUsesInItsStages = async (
    namespace: string,
    codebaseName: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelinesStages(namespace);

    for (const {
        spec: {
            source: {
                library: { name },
            },
            cdPipeline,
        },
    } of items) {
        if (name === codebaseName) {
            return await getCDPipelineByName(namespace, cdPipeline);
        }
    }

    return null;
};

export const getCDPipelineByAutotestItUsesInItsStages = async (
    namespace: string,
    codebaseName: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelinesStages(namespace);

    for (const {
        spec: { qualityGates, cdPipeline },
    } of items) {
        for (const { autotestName } of qualityGates) {
            if (autotestName === codebaseName) {
                return await getCDPipelineByName(namespace, cdPipeline);
            }
        }
    }

    return null;
};

export const getCDPipelineByAutotestBranchItUsesInItsStages = async (
    namespace: string,
    codebaseBranchName: string
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const { items } = await getCDPipelinesStages(namespace);

    for (const {
        spec: { qualityGates, cdPipeline },
    } of items) {
        for (const { branchName } of qualityGates) {
            if (branchName && branchName === codebaseBranchName) {
                return await getCDPipelineByName(namespace, cdPipeline);
            }
        }
    }

    return null;
};
