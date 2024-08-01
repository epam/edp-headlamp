import { Grid } from '@mui/material';
import React from 'react';
import { MultiFormContextProvider } from '../../providers/MultiForm';
import { FormItem } from '../../providers/MultiForm/types';
import { FORM_MODES } from '../../types/forms';
import { Actions } from './components/Actions';
import { CodemieForm } from './components/Codemie';
import { CodemieProjectForm } from './components/CodemieProject';
import { CodemieProjectSettingsForm } from './components/CodemieProjectSettings';
import { CodemieProjectSettingsSecretForm } from './components/CodemieProjectSettingsSecret';
import { CodemieSecretForm } from './components/CodemieSecret';
import { QuickLinkForm } from './components/QuickLink';
import { useCodemieCreateForm } from './hooks/useCodemieCreateForm';
import { useCodemieEditForm } from './hooks/useCodemieEditForm';
import { useCodemieProjectCreateForm } from './hooks/useCodemieProjectCreateForm';
import { useCodemieProjectEditForm } from './hooks/useCodemieProjectEditForm';
import { useCodemieProjectSettingsCreateForm } from './hooks/useCodemieProjectSettingsCreateForm';
import { useCodemieProjectSettingsEditForm } from './hooks/useCodemieProjectSettingsEditForm';
import { useCodemieSecretCreateForm } from './hooks/useCodemieSecretCreateForm';
import { useCodemieSecretEditForm } from './hooks/useCodemieSecretEditForm';
import { useCodemieSettingsSecretCreateForm } from './hooks/useCodemieSettingsSecretCreateForm';
import { useCodemieSettingsSecretEditForm } from './hooks/useCodemieSettingsSecretEditForm';
import { useQuickLinkEditForm } from './hooks/useQuickLinkEditForm';
import { DataContextProvider } from './providers/Data';
import { FormNames, ManageCodeMieProps } from './types';

export const ManageCodeMie = ({
  quickLink,
  codemie,
  codemieProject,
  codemieProjectSettings,
  codemieSecret,
  codemieProjectSettingsSecret,
  handleClosePanel,
}: ManageCodeMieProps) => {
  const quickLinkFormMode = FORM_MODES.EDIT;
  const codemieFormMode = codemie ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const codemieSecretFormMode = codemieSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const codemieProjectFormMode = codemieProject ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const codemieProjectSettingsFormMode = codemieProjectSettings
    ? FORM_MODES.EDIT
    : FORM_MODES.CREATE;
  const codemieProjectSettingsSecretFormMode = codemieProjectSettingsSecret
    ? FORM_MODES.EDIT
    : FORM_MODES.CREATE;

  const quickLinkEditForm = useQuickLinkEditForm({
    quickLink,
  });

  const codemieCreateForm = useCodemieCreateForm({ handleClosePanel });
  const codemieEditForm = useCodemieEditForm({ handleClosePanel, codemie });

  const codemieSecretCreateForm = useCodemieSecretCreateForm({ handleClosePanel });
  const codemieSecretEditForm = useCodemieSecretEditForm({
    handleClosePanel,
    secret: codemieSecret,
  });

  const codemieProjectCreateForm = useCodemieProjectCreateForm({ handleClosePanel });
  const codemieProjectEditForm = useCodemieProjectEditForm({
    handleClosePanel,
    codemieProject,
  });

  const codemieProjectSettingsCreateForm = useCodemieProjectSettingsCreateForm({
    handleClosePanel,
  });
  const codemieProjectSettingsEditForm = useCodemieProjectSettingsEditForm({
    handleClosePanel,
    codemieProjectSettings,
  });

  const codemieProjectSettingsSecretCreateForm = useCodemieSettingsSecretCreateForm({
    handleClosePanel,
    codemieProject,
  });
  const codemieProjectSettingsSecretEditForm = useCodemieSettingsSecretEditForm({
    handleClosePanel,
    secret: codemieProjectSettingsSecret,
    codemieProject,
  });

  const quickLinkFormData: FormItem = React.useMemo(
    () => ({
      mode: quickLinkFormMode,
      form: quickLinkEditForm.form,
      onSubmit: quickLinkEditForm.form.handleSubmit(quickLinkEditForm.handleSubmit),
      isSubmitting: quickLinkEditForm.mutation.isLoading,
    }),
    [
      quickLinkEditForm.form,
      quickLinkEditForm.handleSubmit,
      quickLinkEditForm.mutation.isLoading,
      quickLinkFormMode,
    ]
  );

  const codemieFormData: FormItem = React.useMemo(
    () =>
      codemieFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: codemieCreateForm.form,
            onSubmit: codemieCreateForm.form.handleSubmit(codemieCreateForm.handleSubmit),
            isSubmitting: codemieCreateForm.mutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: codemieEditForm.form,
            onSubmit: codemieEditForm.form.handleSubmit(codemieEditForm.handleSubmit),
            isSubmitting: codemieEditForm.mutation.isLoading,
          },
    [
      codemieCreateForm.form,
      codemieCreateForm.handleSubmit,
      codemieCreateForm.mutation.isLoading,
      codemieEditForm.form,
      codemieEditForm.handleSubmit,
      codemieEditForm.mutation.isLoading,
      codemieFormMode,
    ]
  );

  const codemieSecretFormData: FormItem = React.useMemo(
    () =>
      codemieSecretFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: codemieSecretCreateForm.form,
            onSubmit: codemieSecretCreateForm.form.handleSubmit(
              codemieSecretCreateForm.handleSubmit
            ),
            isSubmitting: codemieSecretCreateForm.mutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: codemieSecretEditForm.form,
            onSubmit: codemieSecretEditForm.form.handleSubmit(codemieSecretEditForm.handleSubmit),
            isSubmitting: codemieSecretEditForm.mutation.isLoading,
          },
    [
      codemieSecretCreateForm.form,
      codemieSecretCreateForm.handleSubmit,
      codemieSecretCreateForm.mutation.isLoading,
      codemieSecretEditForm.form,
      codemieSecretEditForm.handleSubmit,
      codemieSecretEditForm.mutation.isLoading,
      codemieSecretFormMode,
    ]
  );

  const codemieProjectFormData: FormItem = React.useMemo(
    () =>
      codemieProjectFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: codemieProjectCreateForm.form,
            onSubmit: codemieProjectCreateForm.form.handleSubmit(
              codemieProjectCreateForm.handleSubmit
            ),
            isSubmitting: codemieProjectCreateForm.mutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: codemieProjectEditForm.form,
            onSubmit: codemieProjectEditForm.form.handleSubmit(codemieProjectEditForm.handleSubmit),
            isSubmitting: codemieProjectEditForm.mutation.isLoading,
          },
    [
      codemieProjectCreateForm.form,
      codemieProjectCreateForm.handleSubmit,
      codemieProjectCreateForm.mutation.isLoading,
      codemieProjectEditForm.form,
      codemieProjectEditForm.handleSubmit,
      codemieProjectEditForm.mutation.isLoading,
      codemieProjectFormMode,
    ]
  );

  const codemieProjectSettingsFormData: FormItem = React.useMemo(
    () =>
      codemieProjectSettingsFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: codemieProjectSettingsCreateForm.form,
            onSubmit: codemieProjectSettingsCreateForm.form.handleSubmit(
              codemieProjectSettingsCreateForm.handleSubmit
            ),
            isSubmitting: codemieProjectSettingsCreateForm.mutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: codemieProjectSettingsEditForm.form,
            onSubmit: codemieProjectSettingsEditForm.form.handleSubmit(
              codemieProjectSettingsEditForm.handleSubmit
            ),
            isSubmitting: codemieProjectSettingsEditForm.mutation.isLoading,
          },
    [
      codemieProjectSettingsCreateForm.form,
      codemieProjectSettingsCreateForm.handleSubmit,
      codemieProjectSettingsCreateForm.mutation.isLoading,
      codemieProjectSettingsEditForm.form,
      codemieProjectSettingsEditForm.handleSubmit,
      codemieProjectSettingsEditForm.mutation.isLoading,
      codemieProjectSettingsFormMode,
    ]
  );

  const codemieProjectSettingsSecretFormData: FormItem = React.useMemo(
    () =>
      codemieProjectSettingsSecretFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: codemieProjectSettingsSecretCreateForm.form,
            onSubmit: codemieProjectSettingsSecretCreateForm.form.handleSubmit(
              codemieProjectSettingsSecretCreateForm.handleSubmit
            ),
            isSubmitting: codemieProjectSettingsSecretCreateForm.mutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: codemieProjectSettingsSecretEditForm.form,
            onSubmit: codemieProjectSettingsSecretEditForm.form.handleSubmit(
              codemieProjectSettingsSecretEditForm.handleSubmit
            ),
            isSubmitting: codemieProjectSettingsSecretEditForm.mutation.isLoading,
          },
    [
      codemieProjectSettingsSecretCreateForm.form,
      codemieProjectSettingsSecretCreateForm.handleSubmit,
      codemieProjectSettingsSecretCreateForm.mutation.isLoading,
      codemieProjectSettingsSecretEditForm.form,
      codemieProjectSettingsSecretEditForm.handleSubmit,
      codemieProjectSettingsSecretEditForm.mutation.isLoading,
      codemieProjectSettingsSecretFormMode,
    ]
  );

  return (
    <div data-testid="form">
      <DataContextProvider
        quickLink={quickLink}
        codemie={codemie}
        codemieSecret={codemieSecret}
        codemieProject={codemieProject}
        codemieProjectSettings={codemieProjectSettings}
        codemieProjectSettingsSecret={codemieProjectSettingsSecret}
        handleClosePanel={handleClosePanel}
      >
        <MultiFormContextProvider<FormNames>
          forms={{
            quickLink: quickLinkFormData,
            codemie: codemieFormData,
            codemieSecret: codemieSecretFormData,
            codemieProject: codemieProjectFormData,
            codemieProjectSettings: codemieProjectSettingsFormData,
            codemieProjectSettingsSecret: codemieProjectSettingsSecretFormData,
          }}
          sharedForm={null}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <QuickLinkForm />
            </Grid>
            <Grid item xs={12}>
              <CodemieForm />
            </Grid>
            <Grid item xs={12}>
              <CodemieSecretForm />
            </Grid>
            <Grid item xs={12}>
              <CodemieProjectForm />
            </Grid>
            <Grid item xs={12}>
              <CodemieProjectSettingsForm />
            </Grid>
            <Grid item xs={12}>
              <CodemieProjectSettingsSecretForm />
            </Grid>
            <Grid item xs={12}>
              <Actions />
            </Grid>
          </Grid>
        </MultiFormContextProvider>
      </DataContextProvider>
    </div>
  );
};
