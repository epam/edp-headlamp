import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { EDPCodebaseKubeObjectInterface } from '../../../EDPCodebase/types';
import { ApplicationKubeObjectInterface } from '../../types';

export const editApplicationInstance = ({
    argoApplication,
    application,
    imageTag,
}: {
    application: EDPCodebaseKubeObjectInterface;
    argoApplication: ApplicationKubeObjectInterface;
    imageTag: string;
}): ApplicationKubeObjectInterface => {
    const {
        spec: {
            versioning: { type: versioningType },
        },
    } = application;
    const isEDPVersioning = versioningType === CODEBASE_VERSIONING_TYPES.EDP;
    const base = { ...argoApplication };

    const newParameters = base.spec.source.helm?.parameters?.map(el => {
        if (el.name === 'image.tag') {
            return {
                ...el,
                value: imageTag,
            };
        }

        return el;
    });

    const newTargetRevision = isEDPVersioning ? `build/${imageTag}` : imageTag;

    base.spec.source.helm.parameters = newParameters;
    base.spec.source.targetRevision = newTargetRevision;

    return base;
};
