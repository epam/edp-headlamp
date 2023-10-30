import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../types/forms';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFromTemplateFormValues } from '../../../types';

const normalizeNameValue = (value: string): string =>
    typeof value === 'string' ? value.trim() : value;

const nameRequirementLabel = `Component name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, and cannot have whitespaces`;

export const Name = () => {
    const {
        register,
        control,
        formState: { errors, dirtyFields },
        setValue,
        watch,
    } = useFormContext<CreateCodebaseFromTemplateFormValues>();

    const gitServerFieldValue = watch(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitServer.name);

    const onChange = ({ target: { value } }: FieldEvent): void => {
        const normalizedValue = normalizeNameValue(value);
        if (
            Object.hasOwn(dirtyFields, CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitUrlPath.name) ||
            gitServerFieldValue !== GIT_SERVERS.GERRIT
        )
            return;

        setValue(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitUrlPath.name, normalizedValue);
    };

    return (
        <FormTextField
            {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.name.name, {
                required: `Enter the Component name`,
                pattern: {
                    value: /^[a-z](?!.*--[^-])[a-z0-9-]*[a-z0-9]$/,
                    message: nameRequirementLabel,
                },
                setValueAs: (value: string) => normalizeNameValue(value),
                onChange: onChange,
            })}
            label={`Component name`}
            title={nameRequirementLabel}
            placeholder={`Enter the Component name`}
            control={control}
            errors={errors}
        />
    );
};
