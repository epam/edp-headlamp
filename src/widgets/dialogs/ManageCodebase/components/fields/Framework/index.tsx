import React from 'react';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../../../configs/codebase-mappings';
import {
  CodebaseInterface,
  CodebaseMappingItemInterface,
} from '../../../../../../configs/codebase-mappings/types';
import { UseSpriteSymbol } from '../../../../../../icons/UseSpriteSymbol';
import { FormRadioGroup } from '../../../../../../providers/Form/components/FormRadioGroup';
import { FormRadioOption } from '../../../../../../providers/Form/components/FormRadioGroup/types';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { getCodebaseMappingByCodebaseType } from '../../../../../../utils/getCodebaseMappingByCodebaseType';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const Framework = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useTypedFormContext();

  const langFieldValue: string = watch(CODEBASE_FORM_NAMES.lang.name);
  const typeFieldValue: string = watch(CODEBASE_FORM_NAMES.type.name);

  const codebaseMapping = getCodebaseMappingByCodebaseType(typeFieldValue) as Record<
    string,
    CodebaseInterface
  >;
  const lang = langFieldValue.toLowerCase();

  const codebaseMappingByLang = codebaseMapping?.[lang];

  const frameworkOptions = React.useMemo(() => {
    if (!codebaseMappingByLang) {
      return [];
    }

    const resultOptions: FormRadioOption[] = [];

    for (const framework of Object.values<CodebaseMappingItemInterface>(
      codebaseMappingByLang.frameworks
    )) {
      const { name, value, icon } = framework;
      resultOptions.push({
        value,
        label: name,
        icon: <UseSpriteSymbol name={icon!} width={20} height={20} />,
        checkedIcon: <UseSpriteSymbol name={icon!} width={20} height={20} />,
      });
    }

    return resultOptions;
  }, [codebaseMappingByLang]);

  return (
    <>
      {langFieldValue === CODEBASE_COMMON_LANGUAGES.OTHER ? (
        <FormTextField
          {...register(CODEBASE_FORM_NAMES.framework.name, {
            required: `Enter ${typeFieldValue} language version/framework`,
            maxLength: {
              value: 8,
              message: 'You exceeded the maximum length of 8',
            },
            pattern: {
              value: /[a-z]/,
              message: 'Invalid language version/framework name: [a-z]',
            },
          })}
          label={`Language version/framework`}
          title={
            'Indicate the version of the programming language or framework your component relies on. '
          }
          placeholder={`Enter language version/framework`}
          control={control}
          errors={errors}
        />
      ) : (
        <FormRadioGroup
          {...register(CODEBASE_FORM_NAMES.framework.name, {
            required: `Select ${typeFieldValue} language version/framework`,
          })}
          control={control}
          errors={errors}
          label={`Language version/framework`}
          title={
            'Indicate the version of the programming language or framework your component relies on. '
          }
          options={frameworkOptions}
        />
      )}
    </>
  );
};
