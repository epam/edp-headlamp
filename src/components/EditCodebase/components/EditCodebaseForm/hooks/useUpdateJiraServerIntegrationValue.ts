import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface useUpdateJiraServerIntegrationValueProps {
    watch: (name: string) => string;
    setValue: (name: string, value: any) => void;
    names: { [key: string]: FormNameObject };
}

export const useUpdateJiraServerIntegrationValue = ({
    watch,
    setValue,
    names,
}: useUpdateJiraServerIntegrationValueProps): void => {
    const jiraServerFieldValue = watch(names.jiraServer.name);

    React.useEffect(() => {
        if (jiraServerFieldValue) {
            setValue(names.hasJiraServerIntegration.name, true);
        }
    }, [jiraServerFieldValue, names.hasJiraServerIntegration.name, setValue]);
};
