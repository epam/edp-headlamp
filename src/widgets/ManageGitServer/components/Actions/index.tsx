import { Icon } from '@iconify/react';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { FORM_MODES } from '../../../../types/forms';
import { useFormsContext } from '../../hooks/useFormsContext';
import { useDataContext } from '../../providers/Data/hooks';
import { DeletionDialog } from '../DeletionDialog';

export const Actions = () => {
  const {
    forms,
    resetAll,
    submitAll,
    isAnyFormDirty,
    isAnyFormSubmitting,
    isAnyFormForbiddenToSubmit,
  } = useFormsContext();

  const { codebasesByGitServerQuery, permissions, gitServer, gitServerSecret, handleClosePanel } =
    useDataContext();
  const submitDisabledTooltip = isAnyFormForbiddenToSubmit
    ? Object.values(forms).find(({ allowedToSubmit: { isAllowed } }) => !isAllowed)?.allowedToSubmit
        .reason
    : '';

  const mode = !!gitServer ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const deletedDisabledState = React.useMemo(() => {
    if (gitServerSecret?.metadata?.ownerReferences) {
      return {
        status: true,
        reason: `You cannot delete this Git Server because its Secret is managed by ${gitServerSecret.metadata.ownerReferences[0].kind}.`,
      };
    }

    if (codebasesByGitServerQuery.data?.items?.length) {
      return {
        status: true,
        reason: 'You cannot delete this Git Server because it has associated codebases.',
      };
    }

    if (!permissions.delete.GitServer.allowed) {
      return {
        status: true,
        reason: permissions?.delete.GitServer.reason,
      };
    }

    return {
      status: false,
      reason: null,
    };
  }, [codebasesByGitServerQuery.data?.items?.length, gitServerSecret, permissions]);

  const handleDelete = React.useCallback(() => {
    if (!deletedDisabledState) {
      return;
    }

    setDeleteDialogOpen(true);
  }, [deletedDisabledState]);

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ justifyContent: 'space-between' }}
      >
        {mode === FORM_MODES.EDIT ? (
          <ConditionalWrapper
            condition={deletedDisabledState.status}
            wrapper={(children) => (
              <Tooltip title={deletedDisabledState.reason}>
                <div>{children}</div>
              </Tooltip>
            )}
          >
            <IconButton onClick={handleDelete} disabled={deletedDisabledState.status} size="large">
              <Icon icon={ICONS.BUCKET} width="20" />
            </IconButton>
          </ConditionalWrapper>
        ) : (
          <Button onClick={handleClosePanel} size="small" color="inherit">
            cancel
          </Button>
        )}

        <Button
          onClick={resetAll}
          size="small"
          component={'button'}
          disabled={!isAnyFormDirty}
          sx={{ ml: 'auto !important' }}
        >
          undo changes
        </Button>

        <ConditionalWrapper
          condition={isAnyFormForbiddenToSubmit}
          wrapper={(children) => (
            <Tooltip title={submitDisabledTooltip}>
              <div>{children}</div>
            </Tooltip>
          )}
        >
          <Button
            onClick={() => submitAll(true)}
            size={'small'}
            component={'button'}
            variant={'contained'}
            color={'primary'}
            disabled={!isAnyFormDirty || isAnyFormSubmitting || isAnyFormForbiddenToSubmit}
          >
            save
          </Button>
        </ConditionalWrapper>
      </Stack>
      <DeletionDialog
        gitServer={gitServer}
        gitServerSecret={gitServerSecret}
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};
