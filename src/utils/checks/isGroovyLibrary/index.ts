import { CODEBASE_COMMON_LANGUAGES } from '../../../configs/codebase-mappings';
import { CODEBASE_TYPE } from '../../../constants/codebaseTypes';
import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';

export const isGroovyLibrary = ({ spec: { type, lang } }: CodebaseKubeObjectInterface): boolean =>
  type === CODEBASE_TYPE['LIBRARY'] && lang === CODEBASE_COMMON_LANGUAGES['GROOVY_PIPELINE'];
