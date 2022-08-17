import { APPLICATION_MAPPING } from '../../../../../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../../../../../configs/codebase-mappings/autotest';
import { LIBRARY_MAPPING } from '../../../../../configs/codebase-mappings/library';
import { CodebaseInterface } from '../../../../../configs/codebase-mappings/types';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../constants';

interface useChosenCodebaseLanguageProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
    type: string;
}

export const useChosenCodebaseLanguage = ({
    watch,
    names,
    type,
}: useChosenCodebaseLanguageProps): { chosenLang: CodebaseInterface } => {
    const langValue = watch(names.lang.name);

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
