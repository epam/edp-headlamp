import { APPLICATION_MAPPING } from '../../../../../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../../../../../configs/codebase-mappings/autotest';
import { LIBRARY_MAPPING } from '../../../../../configs/codebase-mappings/library';
import { CodebaseInterface } from '../../../../../configs/codebase-mappings/types';
import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { React } from '../../../../../plugin.globals';

interface UseChosenCodebaseLanguageProps {
    type: string;
    langValue: string;
}

export const useChosenCodebaseLanguage = ({
    type,
    langValue,
}: UseChosenCodebaseLanguageProps): { chosenLang: CodebaseInterface } => {
    const chosenLang = React.useMemo(() => {
        if (type === CODEBASE_TYPES['APPLICATION']) {
            return APPLICATION_MAPPING[langValue];
        }

        if (type === CODEBASE_TYPES['LIBRARY']) {
            return LIBRARY_MAPPING[langValue];
        }

        if (type === CODEBASE_TYPES['AUTOTEST']) {
            return AUTOTEST_MAPPING[langValue];
        }
    }, [langValue, type]);

    return { chosenLang };
};
