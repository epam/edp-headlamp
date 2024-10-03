import { Icon } from '@iconify/react';
import { NameValueTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Button, IconButton, Stack, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { FORM_CONTROL_LABEL_HEIGHT } from '../../../../constants/ui';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useConfigMapCRUD } from '../../../../k8s/groups/default/ConfigMap/hooks/useConfigMapCRUD';
import { ConfigMapKubeObjectInterface } from '../../../../k8s/groups/default/ConfigMap/types';
import { FormTextField } from '../../../../providers/Form/components/FormTextField';

export const Variables = ({ configMap }: { configMap: ConfigMapKubeObjectInterface }) => {
  const {
    editConfigMap,
    mutations: { configMapEditMutation },
  } = useConfigMapCRUD({});

  const dataEntries = Object.entries<string>(configMap?.data || {});

  const defaultValues = {
    variables: dataEntries.map(([key, value]) => ({
      key,
      value,
    })),
  };

  const form = useForm({
    defaultValues,
  });

  const {
    register,
    control,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables',
  });

  const handleDelete = React.useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const theme = useTheme();

  const onSubmit = (values) => {
    const configMapCopy = { ...configMap };
    configMapCopy.data = values.variables.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});

    editConfigMap({ configMapData: configMapCopy });
    reset(values, { keepValues: true });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <NameValueTable
            rows={fields.map((field, index) => {
              return {
                name: (
                  <FormTextField
                    {...register(`variables.${index}.key`, {
                      required: 'Enter a key',
                    })}
                    placeholder={'Var name'}
                    label={'Key'}
                    control={control}
                    errors={errors}
                    key={`${field.id}-key`}
                  />
                ),
                value: (
                  <Stack spacing={2} direction="row" alignItems="center">
                    <Box flexGrow={1}>
                      <FormTextField
                        {...register(`variables.${index}.value`, {
                          required: 'Enter a value',
                        })}
                        label={'Value'}
                        placeholder={'Var value'}
                        control={control}
                        errors={errors}
                        key={`${field.id}-value`}
                      />
                    </Box>
                    <Box sx={{ pt: (t) => t.typography.pxToRem(FORM_CONTROL_LABEL_HEIGHT) }}>
                      <IconButton onClick={() => handleDelete(index)} size="medium">
                        <Icon icon={ICONS.BUCKET} width="20" />
                      </IconButton>
                    </Box>
                  </Stack>
                ),
              };
            })}
          />
          <Stack alignItems="flex-end" sx={{ pr: (t) => t.typography.pxToRem(16) }}>
            <Button
              type={'button'}
              size={'small'}
              component={'button'}
              style={{ minWidth: 0 }}
              onClick={() => append({ key: '', value: '' })}
            >
              <Icon icon={ICONS.PLUS} width={20} color={theme.palette.secondary.dark} />
            </Button>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ justifyContent: 'flex-end' }}
          >
            <Button
              size="small"
              component={'button'}
              sx={{ ml: 'auto !important' }}
              onClick={() => reset()}
              disabled={!isDirty}
            >
              undo changes
            </Button>
            <Button
              size={'small'}
              component={'button'}
              variant={'contained'}
              color={'primary'}
              disabled={configMapEditMutation.isLoading || !isDirty}
              onClick={handleSubmit(onSubmit)}
            >
              save
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
};
