import { APPLICATION_MAPPING } from '../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../configs/codebase-mappings/autotest';
import { INFRASTRUCTURE_MAPPING } from '../configs/codebase-mappings/infrastructure';
import { LIBRARY_MAPPING } from '../configs/codebase-mappings/library';
import { SYSTEM_MAPPING } from '../configs/codebase-mappings/system';
import { CODEBASE_TYPES } from '../constants/codebaseTypes';

export const getCodebaseMappingByCodebaseType = (type: CODEBASE_TYPES | string) => {
  return type === CODEBASE_TYPES.APPLICATION
    ? APPLICATION_MAPPING
    : type === CODEBASE_TYPES.LIBRARY
    ? LIBRARY_MAPPING
    : type === CODEBASE_TYPES.AUTOTEST
    ? AUTOTEST_MAPPING
    : type === CODEBASE_TYPES.INFRASTRUCTURE
    ? INFRASTRUCTURE_MAPPING
    : type === CODEBASE_TYPES.SYSTEM
    ? SYSTEM_MAPPING
    : null;
};
