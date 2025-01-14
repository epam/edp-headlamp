import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Grid } from '@mui/material';
import React from 'react';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCRUDMutation';
import { CodemieApplicationKubeObject } from '../../../../k8s/groups/EDP/CodemieApplication';
import { CodemieApplicationKubeObjectConfig } from '../../../../k8s/groups/EDP/CodemieApplication/config';
import { CodemieApplicationKubeObjectInterface } from '../../../../k8s/groups/EDP/CodemieApplication/types';
import { CodemieProjectSettingsKubeObject } from '../../../../k8s/groups/EDP/CodemieProjectSettings';
import { CodemieProjectSettingsKubeObjectConfig } from '../../../../k8s/groups/EDP/CodemieProjectSettings/config';
import { CodemieProjectSettingsKubeObjectInterface } from '../../../../k8s/groups/EDP/CodemieProjectSettings/types';
import { ManageCodeMie } from '../../../../widgets/ManageCodeMie';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { CodemieApplications } from './components/Applications';
import { CodemieSection } from './components/Codemie';
import { CodemieProjectSettings } from './components/CodemieProjectSettings';
import { pageDescription } from './constants';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const { codemie, codemieQuickLink, codemieSecret } = useDynamicDataContext();

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const permissions = useTypedPermissions();

  const [editor, setEditor] = React.useState<{
    open: boolean;
    data: KubeObjectInterface | undefined;
  }>({
    open: false,
    data: undefined,
  });

  const handleOpenEditor = (data: KubeObjectInterface) => {
    setEditor({ open: true, data });
  };

  const handleCloseEditor = () => {
    setEditor({ open: false, data: undefined });
  };

  const codemieProjectSettingsEditMutation = useResourceCRUDMutation<
    CodemieProjectSettingsKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('codemieProjectSettingsEditMutation', CodemieProjectSettingsKubeObject, CRUD_TYPES.EDIT, {
    createCustomMessages: () => ({
      onMutate: {
        message: 'Applying changes...',
      },
      onError: {
        message: 'Failed to update settings',
      },
      onSuccess: {
        message: 'Start updating settings',
      },
    }),
  });

  const codemieApplicationEditMutation = useResourceCRUDMutation<
    CodemieApplicationKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('codemieApplicationEditMutation', CodemieApplicationKubeObject, CRUD_TYPES.EDIT, {
    createCustomMessages: () => ({
      onMutate: {
        message: 'Applying changes...',
      },
      onError: {
        message: 'Failed to update application',
      },
      onSuccess: {
        message: 'Start updating application',
      },
    }),
  });

  const handleEditorSave = (
    data: CodemieProjectSettingsKubeObjectInterface[] | CodemieApplicationKubeObjectInterface[]
  ) => {
    const [item] = data;

    if (item.kind === CodemieProjectSettingsKubeObjectConfig.kind) {
      codemieProjectSettingsEditMutation.mutate(item as CodemieProjectSettingsKubeObjectInterface, {
        onSuccess: () => {
          handleCloseEditor();
        },
      });
      return;
    } else if (item.kind === CodemieApplicationKubeObjectConfig.kind) {
      codemieApplicationEditMutation.mutate(item as CodemieApplicationKubeObjectInterface, {
        onSuccess: () => {
          handleCloseEditor();
        },
      });
    }
  };

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add Integration',
        component: (
          <ManageCodeMie
            quickLink={codemieQuickLink.data}
            codemie={codemie.data}
            codemieSecret={codemieSecret.data}
            permissions={permissions}
            handleClosePanel={handleCloseCreateDialog}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: true,
        permission: {
          allowed: permissions?.create?.Secret.allowed,
          reason: permissions?.create?.Secret.reason,
        },
      }}
      pageDescription={pageDescription}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CodemieSection
            handleOpenCreateDialog={handleOpenCreateDialog}
            handleCloseCreateDialog={handleCloseCreateDialog}
          />
        </Grid>
        <Grid item xs={12}>
          <CodemieProjectSettings handleOpenEditor={handleOpenEditor} />
        </Grid>
        <Grid item xs={12} sx={{ pb: (t) => t.typography.pxToRem(40) }}>
          <CodemieApplications handleOpenEditor={handleOpenEditor} />
        </Grid>
      </Grid>
      {editor.open && editor.data && (
        <EditorDialog
          open={editor.open}
          item={editor.data}
          onClose={handleCloseEditor}
          onSave={handleEditorSave}
        />
      )}
    </ConfigurationPageContent>
  );
};
