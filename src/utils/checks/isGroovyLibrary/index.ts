import { LIBRARY_LANGUAGES } from '../../../configs/codebase-mappings/library';
import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';

export const isGroovyLibrary = ({
    spec: { type, lang },
}: EDPCodebaseKubeObjectInterface): boolean =>
    type === CODEBASE_TYPES['LIBRARY'] && lang === LIBRARY_LANGUAGES['GROOVY_PIPELINE'];
