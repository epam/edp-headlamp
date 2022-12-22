import { useFormContext } from 'react-hook-form';
import { getCreationStrategySelectOptionsByCodebaseType } from '../../../../configs/select-options/creationStrategies';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../constants/creationStrategies';
import { GIT_SERVERS } from '../../../../constants/gitServers';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { GitServersDataContext } from '../../../CreateCodebase/components/CreateCodebaseForm';
import { FormSelect } from '../../../FormComponents';
import { StrategyProps } from './types';

const { Grid } = MuiCore;

export const Strategy = ({ names, handleFormFieldChange }: StrategyProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const typeFieldValue = watch(names.type.name);

    const gitServers = React.useContext(GitServersDataContext);

    const hasGerritGitServer = React.useMemo(() => {
        if (!gitServers) {
            return true;
        }

        return !!gitServers.find(el => el.spec.gitProvider === GIT_SERVERS['GERRIT']);
    }, [gitServers]);

    const strategyOptions = React.useMemo(
        () =>
            hasGerritGitServer
                ? getCreationStrategySelectOptionsByCodebaseType(typeFieldValue)
                : [
                      {
                          label: capitalizeFirstLetter(CODEBASE_CREATION_STRATEGIES['IMPORT']),
                          value: CODEBASE_CREATION_STRATEGIES['IMPORT'],
                      },
                  ],
        [hasGerritGitServer, typeFieldValue]
    );

    React.useEffect(() => {
        if (!hasGerritGitServer) {
            setValue(names.strategy.name, CODEBASE_CREATION_STRATEGIES['IMPORT']);
            handleFormFieldChange({
                name: names.strategy.name,
                value: CODEBASE_CREATION_STRATEGIES['IMPORT'],
            });
        }
    }, [handleFormFieldChange, hasGerritGitServer, names, setValue]);

    return (
        <Grid item xs={12}>
            <FormSelect
                {...register(names.strategy.name, {
                    required: 'Select the existing codebase creation strategy',
                    onBlur: ({ target: { name, value } }: FieldEvent) =>
                        handleFormFieldChange({ name, value }),
                })}
                label={'Repository onboarding strategy'}
                placeholder={'Select the existing codebase creation strategy'}
                title={'Create a new application or use an existing one'}
                control={control}
                errors={errors}
                options={strategyOptions}
            />
        </Grid>
    );
};
