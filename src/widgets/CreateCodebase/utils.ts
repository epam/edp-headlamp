import { getApplicationRecommendedJenkinsAgent } from '../../configs/codebase-mappings/application';
import { getAutotestRecommendedJenkinsAgent } from '../../configs/codebase-mappings/autotest';
import { getLibraryRecommendedJenkinsAgent } from '../../configs/codebase-mappings/library';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../constants/creationStrategies';

export const isCloneStrategy = strategyValue =>
    strategyValue === CODEBASE_CREATION_STRATEGIES['CLONE'];

export const getRecommendedJenkinsAgent = (
    type: string,
    { lang, framework, buildTool }: { lang: string; framework: string; buildTool: string }
): string => {
    if (type === CODEBASE_TYPES['APPLICATION']) {
        return getApplicationRecommendedJenkinsAgent(lang, framework, buildTool);
    }

    if (type === CODEBASE_TYPES['LIBRARY']) {
        return getLibraryRecommendedJenkinsAgent(lang, framework, buildTool);
    }

    if (type === CODEBASE_TYPES['AUTOTEST']) {
        return getAutotestRecommendedJenkinsAgent(lang, framework, buildTool);
    }
};
