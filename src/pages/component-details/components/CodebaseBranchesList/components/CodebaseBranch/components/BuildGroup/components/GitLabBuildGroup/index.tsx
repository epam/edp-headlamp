import { Icon } from '@iconify/react';
import {
  ButtonGroup,
  ClickAwayListener,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  useTheme,
} from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../../../../../../../components/ButtonWithPermission';
import { CUSTOM_RESOURCE_STATUS } from '../../../../../../../../../../constants/statuses';
import { ICONS } from '../../../../../../../../../../icons/iconify-icons-mapping';
import { useTypedPermissions } from '../../../../../../../../hooks/useTypedPermissions';
import { GitLabBuildGroupProps } from './types';

export const GitLabBuildGroup: React.FC<GitLabBuildGroupProps> = ({
  codebaseBranch,
  handleOpenGitLabParamsDialog,
  handleDirectGitLabBuild,
  menuAnchorEl,
  handleClickMenu,
  handleCloseMenu,
  isGitLabLoading,
}) => {
  const open = Boolean(menuAnchorEl);
  const id = open ? 'simple-popper' : undefined;
  const theme = useTheme();
  const permissions = useTypedPermissions();

  const codebaseBranchStatusIsOk =
    codebaseBranch?.status?.status === CUSTOM_RESOURCE_STATUS.CREATED;

  const buildButtonDisabled =
    !permissions.create.PipelineRun.allowed || !codebaseBranchStatusIsOk || isGitLabLoading;

  const buildButtonTooltip = (() => {
    if (!permissions.create.PipelineRun.allowed) {
      return permissions.create.PipelineRun.reason;
    }

    if (isGitLabLoading) {
      return 'Triggering GitLab pipeline...';
    }

    if (!codebaseBranchStatusIsOk) {
      return `Codebase branch status is ${codebaseBranch?.status?.status}`;
    }

    return 'Trigger GitLab CI pipeline';
  })();

  return (
    <>
      <ButtonGroup variant="outlined" sx={{ color: theme.palette.text.primary }}>
        <ButtonWithPermission
          ButtonProps={{
            startIcon: isGitLabLoading ? (
              <Icon icon={'line-md:loading-loop'} width={20} height={20} />
            ) : (
              <Icon icon={ICONS.PLAY} width={20} height={20} />
            ),
            onClick: handleDirectGitLabBuild,
            size: 'small',
            sx: {
              height: '100%',
              color: theme.palette.secondary.dark,
              borderColor: theme.palette.secondary.dark,
            },
          }}
          disabled={buildButtonDisabled}
          reason={buildButtonTooltip}
        >
          {isGitLabLoading ? 'building' : 'build'}
        </ButtonWithPermission>
        <ButtonWithPermission
          ButtonProps={{
            size: 'small',
            onClick: handleClickMenu,
            sx: {
              height: '100%',
              color: theme.palette.secondary.dark,
              borderColor: theme.palette.secondary.dark,
            },
          }}
          disabled={buildButtonDisabled}
          reason={buildButtonTooltip}
        >
          <Icon icon={ICONS.ARROW_DROPDOWN} width={15} height={15} />
        </ButtonWithPermission>
      </ButtonGroup>
      <Popper
        id={id}
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={menuAnchorEl}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <MenuList autoFocusItem>
                  <MenuItem onClick={handleOpenGitLabParamsDialog}>
                    <ListItemIcon>
                      <Icon icon={ICONS.PLAY} width={25} height={25} />
                    </ListItemIcon>
                    <ListItemText>Build with params</ListItemText>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
