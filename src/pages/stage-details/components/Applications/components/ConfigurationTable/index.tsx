import { Icon } from '@iconify/react';
import { Button, Stack, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ButtonWithPermission } from '../../../../../../components/ButtonWithPermission';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
import { Table } from '../../../../../../components/Table';
import { TABLE } from '../../../../../../constants/tables';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { APPLICATIONS_TABLE_MODE } from '../../../../constants';
import { useTypedPermissions } from '../../../../hooks/useTypedPermissions';
import { EnrichedApplicationWithArgoApplication } from '../../../../types';

export const ConfigurationTable = ({
  data,
  columns,
  setMode,
  deployBtnDisabled,
  setDeployBtnDisabled,
  latestDeployPipelineRunIsRunning,
  handleClickDeploy,
  buttonsEnabledMap,
  buttonsHighlighted,
}) => {
  const permissions = useTypedPermissions();
  const theme = useTheme();
  const {
    reset,
    formState: { dirtyFields },
  } = useFormContext();

  const [key, setKey] = React.useState(0);

  const isDirty = Object.keys(dirtyFields).length > 0;

  const timer = React.useRef<number | null>(null);

  React.useEffect(() => {
    setKey((prev) => prev + 1);
  }, [buttonsHighlighted]);

  return (
    <>
      <Stack spacing={3} alignItems="center" direction="row" justifyContent="flex-end">
        <Tooltip title={'Reset selected image stream versions'}>
          <Button
            onClick={() => reset()}
            disabled={!isDirty}
            sx={{ color: theme.palette.secondary.dark }}
          >
            undo changes
          </Button>
        </Tooltip>
        <Button
          onClick={() => {
            reset();
            setMode(APPLICATIONS_TABLE_MODE.PREVIEW);
          }}
          variant="outlined"
        >
          cancel
        </Button>
        <ConditionalWrapper
          condition={permissions?.create?.PipelineRun.allowed}
          wrapper={(children) => (
            <Tooltip title={'Deploy selected applications with selected image stream version'}>
              {children}
            </Tooltip>
          )}
        >
          <ButtonWithPermission
            ButtonProps={{
              startIcon:
                deployBtnDisabled || latestDeployPipelineRunIsRunning ? (
                  <Icon icon={'line-md:loading-loop'} />
                ) : (
                  <Icon icon={ICONS.CHECK} />
                ),
              onClick: () => {
                handleClickDeploy();
                setMode(APPLICATIONS_TABLE_MODE.PREVIEW);
                setDeployBtnDisabled(true);

                timer.current = window.setTimeout(() => {
                  setDeployBtnDisabled(false);
                }, 10000);
              },
              disabled: deployBtnDisabled || !buttonsEnabledMap.deploy,
              variant: 'contained',
              color: 'primary',
            }}
            disabled={!permissions?.create?.PipelineRun.allowed}
            reason={permissions?.create?.PipelineRun.reason}
          >
            Start Deploy
          </ButtonWithPermission>
        </ConditionalWrapper>
      </Stack>
      <Table<EnrichedApplicationWithArgoApplication>
        key={key}
        id={TABLE.STAGE_APPLICATION_LIST_CONFIGURATION.id}
        name={TABLE.STAGE_APPLICATION_LIST_CONFIGURATION.name}
        data={data}
        columns={columns}
        isLoading={data === null}
        settings={{
          show: false,
        }}
      />
    </>
  );
};
