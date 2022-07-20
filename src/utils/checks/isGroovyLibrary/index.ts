import { EDPCodebaseKubeObjectConfig } from '../../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';

export const isGroovyLibrary = ({
    spec: { type, lang },
}: EDPCodebaseKubeObjectInterface): boolean =>
    type === EDPCodebaseKubeObjectConfig.types.library.name.singularForm &&
    lang === 'groovy-pipeline';
