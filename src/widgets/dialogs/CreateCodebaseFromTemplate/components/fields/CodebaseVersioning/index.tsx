import { Grid } from '@mui/material';
import React from 'react';
import { codebaseVersioningTypeSelectOptions } from '../../../../../../configs/select-options/codebaseVersioningTypes';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../../constants/codebaseVersioningTypes';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';

export const CodebaseVersioning = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useTypedFormContext();

  const codebaseVersioningTypeFieldValue = watch(
    CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningType.name
  );

  const versioningStartFromVersionFieldValue = watch(
    CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromVersion.name
  );
  const versioningStartFromSnapshotFieldValue = watch(
    CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromPostfix.name
  );
  const onStartVersionFromSnapshotStaticFieldChange = ({ target: { value } }: FieldEvent) => {
    setValue(
      CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFrom.name,
      `${versioningStartFromVersionFieldValue || ''}-${value}`
    );
  };

  const onStartVersionFromVersionChange = ({ target: { value } }: FieldEvent) => {
    setValue(
      CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFrom.name,
      `${value}-${versioningStartFromSnapshotFieldValue || ''}`
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormSelect
          {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningType.name, {
            required: 'Select codebase versioning type',
          })}
          label={'Codebase versioning type'}
          title={'Define the versioning strategy for source code and artifacts.'}
          control={control}
          errors={errors}
          options={codebaseVersioningTypeSelectOptions}
        />
      </Grid>
      {codebaseVersioningTypeFieldValue === CODEBASE_VERSIONING_TYPES.EDP ||
      codebaseVersioningTypeFieldValue === CODEBASE_VERSIONING_TYPES.SEMVER ? (
        <>
          <Grid item xs={4}>
            <FormTextField
              {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromVersion.name, {
                required: 'Specify the initial version.',
                onBlur: onStartVersionFromVersionChange,
                pattern: {
                  value:
                    /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/,
                  message: 'Enter valid semantic versioning format',
                },
              })}
              label={'Start version from'}
              title={
                'Define the initial version number or identifier for your codebase to mark the starting point for version control.'
              }
              placeholder={'0.0.0'}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'column',
            }}
          >
            <FormTextField
              {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromPostfix.name, {
                required: 'Add a suffix.',
                onBlur: onStartVersionFromSnapshotStaticFieldChange,
              })}
              placeholder={'SNAPSHOT'}
              label={'Suffix'}
              title={
                'Add a suffix to your version name to provide categorization. E.g. SNAPSHOT, unstable, test.'
              }
              control={control}
              errors={errors}
            />
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};
