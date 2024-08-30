import React from 'react';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../../../configs/codebase-mappings';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../../constants/creationStrategies';
import { UseSpriteSymbol } from '../../../../../../icons/UseSpriteSymbol';
import { FormRadioGroup } from '../../../../../../providers/Form/components/FormRadioGroup';
import { FormRadioOption } from '../../../../../../providers/Form/components/FormRadioGroup/types';
import { capitalizeFirstLetter } from '../../../../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../../../../utils/getCodebaseMappingByCodebaseType';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const Lang = () => {
  const {
    unregister,
    register,
    control,
    formState: { errors },
    resetField,
    watch,
  } = useTypedFormContext();

  const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
  const strategyValue = watch(CODEBASE_FORM_NAMES.strategy.name);
  const capitalizedCodebaseType = capitalizeFirstLetter(typeFieldValue);

  const langOptions = React.useMemo(() => {
    const codebaseMapping = getCodebaseMappingByCodebaseType(typeFieldValue);

    const resultOptions: FormRadioOption[] = [];

    if (!codebaseMapping) {
      return resultOptions;
    }

    for (const mapping of Object.values(codebaseMapping)) {
      const {
        language: { name, value, icon },
      } = mapping;

      const isDisabled =
        value === CODEBASE_COMMON_LANGUAGES.OTHER &&
        strategyValue === CODEBASE_CREATION_STRATEGIES.CREATE;

      resultOptions.push({
        value,
        label: name,
        icon: <UseSpriteSymbol name={icon} width={20} height={20} />,
        checkedIcon: <UseSpriteSymbol name={icon} width={20} height={20} />,
        disabled: isDisabled,
        disabledTooltip: isDisabled
          ? 'Choose this option if your desired programming language is not listed. This option is available exclusively when using the Clone and Import strategy.'
          : null,
      });
    }

    return resultOptions;
  }, [strategyValue, typeFieldValue]);

  const onLangChange = React.useCallback(async () => {
    resetField(CODEBASE_FORM_NAMES.framework.name);
    resetField(CODEBASE_FORM_NAMES.buildTool.name);
    unregister(CODEBASE_FORM_NAMES.framework.name);
  }, [resetField, unregister]);

  return (
    <FormRadioGroup
      {...register(CODEBASE_FORM_NAMES.lang.name, {
        required: `Select codebase language`,
        onChange: onLangChange,
      })}
      control={control}
      errors={errors}
      label={`${capitalizedCodebaseType} code language`}
      title={'Specify the primary programming language used in your component.'}
      options={langOptions}
    />
  );
};
