import React from 'react';
import { APPLICATION_MAPPING } from '../../../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../../../configs/codebase-mappings/autotest';
import { INFRASTRUCTURE_MAPPING } from '../../../configs/codebase-mappings/infrastructure';
import { LIBRARY_MAPPING } from '../../../configs/codebase-mappings/library';
import { CodebaseInterface } from '../../../configs/codebase-mappings/types';
import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';

interface UseChosenCodebaseLanguageProps {
    type: string;
    lang: string;
}

export const useChosenCodebaseLanguage = ({
    type,
    lang,
}: UseChosenCodebaseLanguageProps): { chosenLang: CodebaseInterface } => {
    const chosenLang = React.useMemo(() => {
        if (type === CODEBASE_TYPES.APPLICATION) {
            return APPLICATION_MAPPING[lang];
        }

        if (type === CODEBASE_TYPES.LIBRARY) {
            return LIBRARY_MAPPING[lang];
        }

        if (type === CODEBASE_TYPES.AUTOTEST) {
            return AUTOTEST_MAPPING[lang];
        }

        if (type === CODEBASE_TYPES.INFRASTRUCTURE) {
            return INFRASTRUCTURE_MAPPING[lang];
        }
    }, [lang, type]);

    return { chosenLang };
};
