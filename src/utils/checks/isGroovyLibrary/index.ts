import { CODEBASE_COMMON_LANGUAGES } from '../../../configs/codebase-mappings';
import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';

export const isGroovyLibrary = ({
    spec: { type, lang },
}: EDPCodebaseKubeObjectInterface): boolean =>
    type === CODEBASE_TYPES['LIBRARY'] && lang === CODEBASE_COMMON_LANGUAGES['GROOVY_PIPELINE'];
