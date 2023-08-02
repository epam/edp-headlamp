import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { SelectOption } from '../../../../../../types/forms';
import { ImageStreamTagsSelectProps } from './types';

export const ImageStreamTagsSelect = ({
    enrichedApplicationWithArgoApplication,
    selected,
    handleSelectRowClick,
}: ImageStreamTagsSelectProps) => {
    const { applicationImageStream, applicationVerifiedImageStream, application } =
        enrichedApplicationWithArgoApplication;
    const {
        control,
        formState: { errors },
        register,
    } = useFormContext();

    const imageStreamTagsOptions: SelectOption[] = React.useMemo(() => {
        let base =
            applicationImageStream && applicationImageStream?.spec?.tags
                ? applicationImageStream?.spec?.tags.map(({ name }) => ({
                      label: name,
                      value: name,
                  }))
                : [];

        if (applicationImageStream && applicationImageStream?.spec?.tags) {
            const latestTagValue = applicationImageStream?.spec?.tags.at(-1).name;
            const latest = {
                label: `[LATEST] - ${latestTagValue}`,
                value: `latest::${latestTagValue}`,
            };

            base = [latest, ...base];
        }

        if (applicationVerifiedImageStream && applicationVerifiedImageStream?.spec?.tags) {
            const verified = applicationVerifiedImageStream?.spec?.tags.map(({ name }) => ({
                label: `[STABLE] - ${name}`,
                value: `stable::${name}`,
            }));

            base = [...verified, ...base];
        }

        return base;
    }, [applicationImageStream, applicationVerifiedImageStream]);

    return (
        <div style={{ width: '100%' }}>
            <FormSelect
                {...register(`image-tag-${application.metadata.name}`, {
                    required: selected.includes(application.metadata.name),
                    onChange: event =>
                        !selected.includes(application.metadata.name) &&
                        handleSelectRowClick(event, enrichedApplicationWithArgoApplication),
                })}
                control={control}
                errors={errors}
                options={imageStreamTagsOptions}
                disabled={!imageStreamTagsOptions.length}
                placeholder={'Image stream version'}
            />
        </div>
    );
};
