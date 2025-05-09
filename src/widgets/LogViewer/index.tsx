import { LightTooltip } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeContainerStatus } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import _ from 'lodash';
import React from 'react';
import { Terminal as XTerminal } from 'xterm';
import { LogViewer } from '../../components/LogViewer';
import { PodKubeObjectInterface } from '../../k8s/groups/default/Pod/types';

// TODO this file is a copy of headlamp\frontend\src\components\common\LogViewer.tsx

const useStyle = makeStyles((theme) => ({
  containerFormControl: {
    minWidth: '11rem',
  },
  linesFormControl: {
    minWidth: '6rem',
  },
  switchControl: {
    margin: 0,
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const _getDefaultContainer = (pod: PodKubeObjectInterface) => {
  if (!pod) {
    return '';
  }

  return pod.spec.containers.length > 0 ? pod.spec.containers[0].name : '';
};

export const LogsViewer = ({
  pods,
  getDefaultContainer,
}: {
  pods: PodKubeObjectInterface[];
  getDefaultContainer?: (pod: PodKubeObjectInterface) => string;
}) => {
  const [activePod, setActivePod] = React.useState<PodKubeObjectInterface>(pods?.[0]);
  const [container, setContainer] = React.useState<string>(
    getDefaultContainer ? getDefaultContainer(pods?.[0]) : _getDefaultContainer(pods?.[0])
  );

  React.useEffect(() => {
    if (!pods || activePod) {
      return;
    }

    const newActivePod = pods?.[0];

    if (!newActivePod) {
      return;
    }

    setActivePod(newActivePod);
  }, [activePod, pods]);

  React.useEffect(() => {
    const newContainer = getDefaultContainer
      ? getDefaultContainer(activePod)
      : _getDefaultContainer(activePod);

    setContainer(newContainer);
  }, [activePod, getDefaultContainer]);

  const classes = useStyle();
  const [showPrevious, setShowPrevious] = React.useState<boolean>(false);
  const [showTimestamps, setShowTimestamps] = React.useState<boolean>(false);
  const [follow] = React.useState<boolean>(false);
  const [lines, setLines] = React.useState<number>(100);
  const [logs, setLogs] = React.useState<{ logs: string[]; lastLineShown: number }>({
    logs: [],
    lastLineShown: -1,
  });

  const xtermRef = React.useRef<XTerminal | null>(null);

  const options = { leading: true, trailing: true, maxWait: 1000 };
  const setLogsDebounced = (logLines: string[]) => {
    setLogs((current) => {
      if (current.lastLineShown >= logLines.length) {
        xtermRef.current?.clear();
        xtermRef.current?.write(logLines.join('').replaceAll('\n', '\r\n'));
      } else {
        xtermRef.current?.write(
          logLines
            .slice(current.lastLineShown + 1)
            .join('')
            .replaceAll('\n', '\r\n')
        );
      }

      return {
        logs: logLines,
        lastLineShown: logLines.length - 1,
      };
    });
  };
  const debouncedSetState = _.debounce(setLogsDebounced, 500, options);

  React.useEffect(
    () => {
      let callback: any = null;

      if (!!activePod) {
        xtermRef.current?.clear();
        setLogs({ logs: [], lastLineShown: -1 });

        callback = activePod.getLogs(container, debouncedSetState, {
          tailLines: lines,
          showPrevious,
          showTimestamps,
          follow,
        });
      }

      return function cleanup() {
        if (callback) {
          callback();
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [container, lines, open, showPrevious, showTimestamps, activePod]
  );

  const handleContainerChange = (event: any) => {
    setContainer(event.target.value);
  };

  const handlePodChange = (event: any) => {
    const newPodName = event.target.value;
    const newPod = pods.find(({ metadata: { name } }) => name === newPodName);
    if (newPod) {
      setActivePod(newPod);
      const defaultContainer = getDefaultContainer
        ? getDefaultContainer(newPod)
        : _getDefaultContainer(newPod);

      if (defaultContainer) {
        setContainer(defaultContainer);
      }
    }
  };

  const handleLinesChange = (event: any) => {
    setLines(event.target.value);
  };

  const handlePreviousChange = () => {
    setShowPrevious((previous) => !previous);
  };

  const hasContainerRestarted = () => {
    const cont = activePod?.status?.containerStatuses?.find(
      (c: KubeContainerStatus) => c.name === container
    );
    if (!cont) {
      return false;
    }

    return cont.restartCount > 0;
  };

  const handleTimestampsChange = () => {
    setShowTimestamps((timestamps) => !timestamps);
  };

  return (
    <LogViewer
      downloadName={`${activePod?.getName()}_${container}`}
      logs={logs.logs}
      xtermRef={xtermRef}
      topActions={[
        <FormControl>
          <InputLabel shrink id={'pod-name-chooser-logs-label'}>
            {'Pod'}
          </InputLabel>
          <Select
            labelId="pod-name-chooser-logs-label"
            id="pod-name-chooser-logs"
            value={activePod ? activePod.metadata.name : ''}
            onChange={handlePodChange}
          >
            {(pods || []).map(({ metadata: { name } }) => (
              <MenuItem value={name} key={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>,
        <FormControl className={classes.containerFormControl}>
          <InputLabel shrink id="container-name-chooser-logs-label">
            {'Container'}
          </InputLabel>
          <Select
            labelId="container-name-chooser-logs-label"
            id="container-name-chooser-logs"
            value={container}
            onChange={handleContainerChange}
          >
            {activePod &&
              activePod.spec.containers.map(({ name }: { name: string }) => (
                <MenuItem value={name} key={name}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>,
        <FormControl className={classes.linesFormControl}>
          <InputLabel shrink id="container-lines-chooser-label">
            {'Lines'}
          </InputLabel>
          <Select
            labelId="container-lines-chooser-label"
            id="container-lines-chooser"
            value={lines}
            onChange={handleLinesChange}
          >
            {[100, 1000, 2500].map((i) => (
              <MenuItem value={i} key={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>,
        <LightTooltip
          title={
            hasContainerRestarted()
              ? 'Show logs for previous instances of this container.'
              : 'You can only select this option for containers that have been restarted.'
          }
        >
          <FormControlLabel
            className={classes.switchControl}
            label={'Show previous'}
            disabled={!hasContainerRestarted()}
            control={
              <Switch
                checked={showPrevious}
                onChange={handlePreviousChange}
                name="checkPrevious"
                color="primary"
                size="small"
              />
            }
          />
        </LightTooltip>,
        <FormControlLabel
          className={classes.switchControl}
          label={'Timestamps'}
          control={
            <Switch
              checked={showTimestamps}
              onChange={handleTimestampsChange}
              name="checkTimestamps"
              color="primary"
              size="small"
            />
          }
        />,
      ]}
    />
  );
};
