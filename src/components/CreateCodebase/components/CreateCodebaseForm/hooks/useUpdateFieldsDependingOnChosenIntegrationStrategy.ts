import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { React } from '../../../../../plugin.globals';
import { FieldEventTarget, FormNameObject } from '../../../../../types/forms';

interface UseUpdateFieldsDependingOnChosenIntegrationStrategyProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    resetField: (name: string) => void;
}

export const useUpdateFieldsDependingOnChosenIntegrationStrategy = ({
    watch,
    handleFormFieldChange,
    resetField,
    names,
}: UseUpdateFieldsDependingOnChosenIntegrationStrategyProps): void => {
    const strategyFieldValue = watch(names.strategy.name);

    React.useEffect(() => {
        if (strategyFieldValue) {
            switch (strategyFieldValue) {
                case CODEBASE_CREATION_STRATEGIES['CREATE']:
                    resetField(names.gitUrlPath.name);
                    handleFormFieldChange({
                        name: names.gitUrlPath.name,
                        value: undefined,
                    });
                    resetField(names.repositoryUrl.name);
                    handleFormFieldChange({
                        name: names.repositoryUrl.name,
                        value: undefined,
                    });
                    resetField(names.hasCodebaseAuth.name);
                    handleFormFieldChange({
                        name: names.hasCodebaseAuth.name,
                        value: undefined,
                    });
                    resetField(names.repositoryLogin.name);
                    handleFormFieldChange({
                        name: names.repositoryLogin.name,
                        value: undefined,
                    });
                    resetField(names.repositoryPasswordOrApiToken.name);
                    handleFormFieldChange({
                        name: names.repositoryPasswordOrApiToken.name,
                        value: undefined,
                    });
                    break;

                case CODEBASE_CREATION_STRATEGIES['CLONE']:
                    resetField(names.gitUrlPath.name);
                    handleFormFieldChange({
                        name: names.gitUrlPath.name,
                        value: undefined,
                    });
                    break;

                case CODEBASE_CREATION_STRATEGIES['IMPORT']:
                    resetField(names.repositoryUrl.name);
                    handleFormFieldChange({
                        name: names.repositoryUrl.name,
                        value: undefined,
                    });
                    resetField(names.hasCodebaseAuth.name);
                    handleFormFieldChange({
                        name: names.hasCodebaseAuth.name,
                        value: undefined,
                    });
                    resetField(names.repositoryLogin.name);
                    handleFormFieldChange({
                        name: names.repositoryLogin.name,
                        value: undefined,
                    });
                    resetField(names.repositoryPasswordOrApiToken.name);
                    handleFormFieldChange({
                        name: names.repositoryPasswordOrApiToken.name,
                        value: undefined,
                    });
                    break;
            }
        }
    }, [strategyFieldValue, names, resetField, handleFormFieldChange]);
};
