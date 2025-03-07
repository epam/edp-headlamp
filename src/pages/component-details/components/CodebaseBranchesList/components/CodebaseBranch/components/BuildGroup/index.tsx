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
import { ButtonWithPermission } from '../../../../../../../../components/ButtonWithPermission';
import { CUSTOM_RESOURCE_STATUS } from '../../../../../../../../constants/statuses';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../../../../../../../k8s/groups/Tekton/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../../../../../../../k8s/groups/Tekton/PipelineRun/constants';
import { createBuildPipelineRunInstance } from '../../../../../../../../k8s/groups/Tekton/PipelineRun/utils/createBuildPipelineRunInstance';
import { useTriggerTemplateByNameQuery } from '../../../../../../../../k8s/groups/Tekton/TriggerTemplate/hooks/useTriggerTemplateByNameQuery';
import { useTypedPermissions } from '../../../../../../hooks/useTypedPermissions';
import { useDynamicDataContext } from '../../../../../../providers/DynamicData/hooks';
import { BuildGroupProps } from './types';

export const BuildGroup = ({
  codebaseBranch,
  latestBuildPipelineRun,
  handleOpenEditor,
  menuAnchorEl,
  handleClickMenu,
  handleCloseMenu,
  createBuildPipelineRun,
}: BuildGroupProps) => {
  const {
    component: { data: codebaseData },
    gitServerByCodebase: { data: gitServerByCodebase },
  } = useDynamicDataContext();

  const open = Boolean(menuAnchorEl);
  const id = open ? 'simple-popper' : undefined;

  const theme = useTheme();

  const { data: buildTriggerTemplate } = useTriggerTemplateByNameQuery({
    props: {
      name: `${gitServerByCodebase?.spec?.gitProvider}-build-template`,
    },
    options: {
      enabled: !!gitServerByCodebase,
    },
  });

  const buildPipelineRunData = (() => {
    if (!gitServerByCodebase) {
      return;
    }

    const buildPipelineRunTemplate = buildTriggerTemplate?.spec?.resourcetemplates?.[0];

    if (!buildPipelineRunTemplate) {
      return;
    }

    const buildPipelineRunTemplateCopy = JSON.parse(JSON.stringify(buildPipelineRunTemplate));

    return createBuildPipelineRunInstance({
      codebase: codebaseData,
      codebaseBranch,
      pipelineRunTemplate: buildPipelineRunTemplateCopy,
      gitServer: gitServerByCodebase,
    });
  })();

  const onBuildButtonClick = React.useCallback(() => {
    createBuildPipelineRun(buildPipelineRunData);
  }, [buildPipelineRunData, createBuildPipelineRun]);

  const permissions = useTypedPermissions();

  const latestBuildIsRunning =
    PipelineRunKubeObject.parseStatusReason(latestBuildPipelineRun?.jsonData)?.toLowerCase() ===
    PIPELINE_RUN_REASON.RUNNING;

  const codebaseBranchStatusIsOk =
    codebaseBranch?.status?.status === CUSTOM_RESOURCE_STATUS.CREATED;

  const buildButtonDisabled =
    !permissions?.create?.PipelineRun.allowed || latestBuildIsRunning || !codebaseBranchStatusIsOk;

  const buildButtonTooltip = (() => {
    if (!permissions?.create?.PipelineRun.allowed) {
      return permissions?.create?.PipelineRun.reason;
    }

    if (latestBuildIsRunning) {
      return 'Latest build PipelineRun is running';
    }

    if (!codebaseBranchStatusIsOk) {
      return `Codebase branch status is ${codebaseBranch?.status?.status}`;
    }

    return 'Trigger build PipelineRun';
  })();

  return (
    <>
      <ButtonGroup variant="outlined" sx={{ color: theme.palette.text.primary }}>
        <ButtonWithPermission
          ButtonProps={{
            startIcon: latestBuildIsRunning ? (
              <Icon icon={'line-md:loading-loop'} width={20} height={20} />
            ) : (
              <Icon icon={ICONS.PLAY} width={20} height={20} />
            ),
            onClick: onBuildButtonClick,
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
          {latestBuildIsRunning ? 'building' : 'build'}
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
                  <MenuItem
                    onClick={() => {
                      handleOpenEditor(buildPipelineRunData);
                    }}
                  >
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
