import { k8s } from '../../plugin.types';

type EDPCodebaseImageStreamSpecTag = {
    created: string;
    name: string;
};

interface EDPCodebaseImageStreamSpecInterface {
    codebase: string;
    imageName: string;
    tags: EDPCodebaseImageStreamSpecTag[] | null;
}

interface EDPCodebaseImageStreamStatusInterface {
    detailedMessage: string;
    failureCount: number;
}

interface EDPCodebaseImageStreamKubeObjectInterface extends k8s.cluster.KubeObjectInterface {
    spec: EDPCodebaseImageStreamSpecInterface;
    status: EDPCodebaseImageStreamStatusInterface;
}

export {
    EDPCodebaseImageStreamSpecInterface,
    EDPCodebaseImageStreamStatusInterface,
    EDPCodebaseImageStreamKubeObjectInterface,
};
