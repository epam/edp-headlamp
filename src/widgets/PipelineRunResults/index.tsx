import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';

export const PipelineRunResults = ({
  pipelineRun,
}: {
  pipelineRun: PipelineRunKubeObjectInterface;
}) => {
  const results = pipelineRun?.status?.results || [];

  if (results.length === 0) {
    return null;
  }

  return (
    <Table size="small">
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '70%' }} />
      </colgroup>
      <TableBody>
        {results.map((el: { name: string; value: string }) => (
          <TableRow>
            <TableCell sx={{ fontWeight: 500 }}>{el.name}</TableCell>
            <TableCell>{el.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
