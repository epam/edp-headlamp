import React from 'react';
import { useParams } from 'react-router-dom';
import { LogViewer } from '../../../../../../components/LogViewer';
import { PipelineRouteParams } from '../../../../types';
import { AllLogsProps } from './types';

export const AllLogs = ({ logs }: AllLogsProps) => {
  const { name } = useParams<PipelineRouteParams>();

  return <LogViewer logs={logs.all} downloadName={`fallback-logs-${name}.log`} />;
};
