import { getApplicationRecommendedJenkinsAgent } from '../../../../configs/codebase-mappings/application';
import { getAutotestRecommendedJenkinsAgent } from '../../../../configs/codebase-mappings/autotest';
import { getLibraryRecommendedJenkinsAgent } from '../../../../configs/codebase-mappings/library';
import { creationStrategies } from '../../../../configs/creationStrategies';
import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../../constants/codebaseTypes';

export const isCloneStrategy = strategyValue => strategyValue === creationStrategies.clone.value;
export const isImportStrategy = strategyValue => strategyValue === creationStrategies.import.value;

export const getRecommendedJenkinsAgent = (
    type: string,
    { lang, framework, buildTool }: { lang: string; framework: string; buildTool: string }
): string => {
    if (type === CODEBASE_TYPE_APPLICATION) {
        return getApplicationRecommendedJenkinsAgent(lang, framework, buildTool);
    }

    if (type === CODEBASE_TYPE_LIBRARY) {
        return getLibraryRecommendedJenkinsAgent(lang, framework, buildTool);
    }

    if (type === CODEBASE_TYPE_AUTOTEST) {
        return getAutotestRecommendedJenkinsAgent(lang, framework, buildTool);
    }
};
