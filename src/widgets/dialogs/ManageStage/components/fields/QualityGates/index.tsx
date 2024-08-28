import { Icon } from '@iconify/react';
import { Button, Divider, Grid, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { Alert } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useAutotestsWithBranches } from '../../../../../../k8s/groups/EDP/Codebase/hooks/useAutotestsWithBranches';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { STAGE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';
import { QualityGateRow } from './components/QualityGateRow';
import { DEFAULT_QUALITY_GATE } from './constants';
import { QualityGate } from './types';
import {
  createQualityGateAutotestFieldName,
  createQualityGateStepNameFieldName,
  createQualityGateTypeAutotestsBranchFieldName,
  createQualityGateTypeFieldName,
} from './utils';

export const QualityGates = () => {
  const theme: DefaultTheme = useTheme();

  const { resetField, watch, setValue } = useTypedFormContext();

  const {
    props: { CDPipelineData },
  } = useCurrentDialog();

  const qualityGatesFieldValue = watch(STAGE_FORM_NAMES.qualityGates.name);

  const handleAddApplicationRow = React.useCallback(() => {
    setValue(STAGE_FORM_NAMES.qualityGates.name, [
      ...qualityGatesFieldValue,
      {
        ...DEFAULT_QUALITY_GATE,
        id: uuidv4(),
      },
    ]);
  }, [qualityGatesFieldValue, setValue]);

  const handleRemoveApplicationRow = React.useCallback(
    (qualityGateIdx) => {
      setValue(
        STAGE_FORM_NAMES.qualityGates.name,
        qualityGatesFieldValue.filter((el) => {
          return el.id !== qualityGateIdx;
        })
      );
      // @ts-ignore
      resetField(createQualityGateTypeFieldName(qualityGateIdx));
      // @ts-ignore
      resetField(createQualityGateStepNameFieldName(qualityGateIdx));
      // @ts-ignore
      resetField(createQualityGateAutotestFieldName(qualityGateIdx));
      // @ts-ignore
      resetField(createQualityGateTypeAutotestsBranchFieldName(qualityGateIdx));
    },
    [qualityGatesFieldValue, resetField, setValue]
  );

  const autotestsWithBranchesOptions = useAutotestsWithBranches(CDPipelineData?.metadata.namespace);

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap={'nowrap'}>
        <Typography variant={'h6'}>Quality gates</Typography>
        <Tooltip
          title={'Define quality gates before promoting applications to the next environment.'}
        >
          <Icon icon={ICONS.INFO_CIRCLE} width={18} />
        </Tooltip>
      </Stack>
      <Stack spacing={2}>
        {(qualityGatesFieldValue as QualityGate[]).map((el, idx) => {
          const key = `quality-gate-row::${el.id}`;
          const isLast = idx === qualityGatesFieldValue.length - 1;
          const isOnly = qualityGatesFieldValue.length === 1;

          return (
            <div key={key}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={10}>
                  <QualityGateRow
                    autotestsWithBranchesOptions={autotestsWithBranchesOptions}
                    currentQualityGate={el}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
                    {!isOnly && (
                      <Button
                        type={'button'}
                        size={'small'}
                        component={'button'}
                        style={{ minWidth: 0 }}
                        onClick={() => handleRemoveApplicationRow(el.id)}
                      >
                        <Icon icon={ICONS.BUCKET} width={20} color={theme.palette.secondary.dark} />
                      </Button>
                    )}
                    {!isOnly && isLast && (
                      <Divider
                        orientation="vertical"
                        sx={{ height: theme.typography.pxToRem(28) }}
                      />
                    )}
                    {isLast && (
                      <Button
                        type={'button'}
                        size={'small'}
                        component={'button'}
                        style={{ minWidth: 0 }}
                        onClick={handleAddApplicationRow}
                      >
                        <Icon icon={ICONS.PLUS} width={20} color={theme.palette.secondary.dark} />
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </Stack>
      {(!qualityGatesFieldValue || !qualityGatesFieldValue.length) && (
        <Alert severity="info" variant="outlined">
          Add at least one quality gate
        </Alert>
      )}
    </Stack>
  );
};
