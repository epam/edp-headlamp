import { APPLICATION_MAPPING } from '../../../../../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../../../../../configs/codebase-mappings/autotest';
import { LIBRARY_MAPPING } from '../../../../../configs/codebase-mappings/library';
import { CodebaseInterface } from '../../../../../configs/codebase-mappings/types';
import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../../../constants/codebaseTypes';
import { React } from '../../../../../plugin.globals';

interface useChosenCodebaseLanguageProps {
    type: string;
    langValue: string;
}

export const useChosenCodebaseLanguage = ({
    type,
    langValue,
}: useChosenCodebaseLanguageProps): { chosenLang: CodebaseInterface } => {
    const chosenLang = React.useMemo(() => {
        if (type === CODEBASE_TYPE_APPLICATION) {
            return APPLICATION_MAPPING[langValue];
        }

        if (type === CODEBASE_TYPE_LIBRARY) {
            return LIBRARY_MAPPING[langValue];
        }

        if (type === CODEBASE_TYPE_AUTOTEST) {
            return AUTOTEST_MAPPING[langValue];
        }
    }, [langValue, type]);

    return { chosenLang };
};
