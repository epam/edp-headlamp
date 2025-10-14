import { Icon } from '@iconify/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { VariableRow } from './components/VariableRow';
import { GitLabBuildWithParamsDialogProps } from './types';

interface FormValues {
  variables: Array<{ key: string; value: string }>;
}

export const GitLabBuildWithParamsDialog: React.FC<GitLabBuildWithParamsDialogProps> = ({
  open,
  onClose,
  onSubmit,
  triggerData,
  isLoading = false,
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      variables: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables',
  });

  const handleAddVariable = React.useCallback(() => {
    append({ key: '', value: '' });
  }, [append]);

  const handleDeleteVariable = React.useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const onFormSubmit = React.useCallback(
    (values: FormValues) => {
      // Filter out empty variables
      const validVariables = values.variables.filter((v) => v.key.trim() !== '');

      onSubmit({
        ...triggerData,
        variables: validVariables,
      });

      // Reset form after submit
      reset();
    },
    [triggerData, onSubmit, reset]
  );

  const handleClose = React.useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogTitle>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Icon icon={ICONS.PLAY} width={24} />
            </Grid>
            <Grid item>
              <Typography variant="h6">Build GitLab Pipeline with Parameters</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <strong>Git Server:</strong> {triggerData.gitServer}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <strong>Project:</strong> {triggerData.gitUrlPath}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <strong>Branch:</strong> {triggerData.branchName}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Pipeline Variables
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Add key-value pairs to pass as environment variables to the GitLab CI pipeline.
              </Typography>
            </Grid>

            {fields.length > 0 && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {fields.map((field, index) => (
                    <Grid item xs={12} key={field.id}>
                      <VariableRow
                        index={index}
                        register={register}
                        control={control}
                        errors={errors}
                        onDelete={() => handleDeleteVariable(index)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="button"
                variant="outlined"
                size="small"
                startIcon={<Icon icon={ICONS.PLUS} width={16} />}
                onClick={handleAddVariable}
              >
                Add Variable
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <Icon icon={'line-md:loading-loop'} width={20} />
              ) : (
                <Icon icon={ICONS.PLAY} width={20} />
              )
            }
          >
            {isLoading ? 'Triggering...' : 'Trigger Pipeline'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
