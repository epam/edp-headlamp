import { CI_TOOLS } from '../../constants/ciTools';
import { ValueOf } from '../../types/global';
import { CODEBASE_COMMON_LANGUAGES } from './index';

interface CodebaseMappingItemInterface {
    name: string;
    value: string;
    icon?: string;
    availableCITools: Array<CI_TOOLS>;
}

export interface CodebaseInterface {
    language: CodebaseMappingItemInterface;
    frameworks: {
        [key: string]: CodebaseMappingItemInterface;
    };
    buildTools: {
        [key: string]: CodebaseMappingItemInterface;
    };
    autoTestReportFrameworks?: {
        [key: string]: CodebaseMappingItemInterface;
    };
}

export type CodebaseMappingKey = ValueOf<typeof CODEBASE_COMMON_LANGUAGES>;
