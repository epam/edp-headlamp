import { EDPKubeObjectInterface } from '../../types/k8s';

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

interface EDPCodebaseImageStreamKubeObjectInterface extends EDPKubeObjectInterface {
    spec: EDPCodebaseImageStreamSpecInterface;
    status: EDPCodebaseImageStreamStatusInterface;
}

export {
    EDPCodebaseImageStreamSpecInterface,
    EDPCodebaseImageStreamStatusInterface,
    EDPCodebaseImageStreamKubeObjectInterface,
};
