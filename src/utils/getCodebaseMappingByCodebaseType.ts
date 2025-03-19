import { APPLICATION_MAPPING } from '../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../configs/codebase-mappings/autotest';
import { INFRASTRUCTURE_MAPPING } from '../configs/codebase-mappings/infrastructure';
import { LIBRARY_MAPPING } from '../configs/codebase-mappings/library';
import { SYSTEM_MAPPING } from '../configs/codebase-mappings/system';
import { CODEBASE_TYPE, CodebaseType } from '../constants/codebaseTypes';

export const getCodebaseMappingByCodebaseType = (type: CodebaseType | string) => {
  return type === CODEBASE_TYPE.APPLICATION
    ? APPLICATION_MAPPING
    : type === CODEBASE_TYPE.LIBRARY
    ? LIBRARY_MAPPING
    : type === CODEBASE_TYPE.AUTOTEST
    ? AUTOTEST_MAPPING
    : type === CODEBASE_TYPE.INFRASTRUCTURE
    ? INFRASTRUCTURE_MAPPING
    : type === CODEBASE_TYPE.SYSTEM
    ? SYSTEM_MAPPING
    : null;
};
