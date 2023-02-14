import { CI_TOOLS } from '../../constants/ciTools';

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
