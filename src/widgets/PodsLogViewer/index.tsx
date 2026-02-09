import { LightTooltip } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeContainerStatus } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import _ from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Terminal as XTerminal } from 'xterm';
import { LogViewer } from '../../components/LogViewer';
import { PodKubeObjectInterface } from '../../k8s/groups/default/Pod/types';
import { PodsLogViewerInnerProps, PodsLogViewerProps } from './types';

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

const PodsLogViewerInner: React.FC<PodsLogViewerInnerProps> = ({
  pods,
  activePod,
  container,
  setContainer,
  handlePodChange,
}) => {
  const classes = useStyle();
  const [showPrevious, setShowPrevious] = React.useState<boolean>(false);
  const [showTimestamps, setShowTimestamps] = React.useState<boolean>(false);
  const [follow, setFollow] = React.useState<boolean>(true);
  const [lines, setLines] = React.useState<number>(100);
  const [logs, setLogs] = React.useState<{ logs: string[]; lastLineShown: number }>({
    logs: [],
    lastLineShown: -1,
  });
  const xtermRef = React.useRef<XTerminal | null>(null);
  const { t } = useTranslation('frequent');

  const options = { leading: true, trailing: true, maxWait: 1000 };
  const setLogsDebounced = React.useCallback(
    (logLines: string[]) => {
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
      // If we stopped following the logs and we have logs already,
      // then we don't need to fetch them again.
      if (!follow && logs.logs.length > 0) {
        xtermRef.current?.write(
          '\n\n' +
            t('translation|Logs are paused. Click the follow button to resume following them.') +
            '\r\n'
        );
        return;
      }
    },
    [follow, logs.logs.length, t]
  );
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
    [container, lines, open, showPrevious, showTimestamps, follow]
  );

  const handleContainerChange = (event: any) => {
    setContainer(event.target.value);
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

  const handleFollowChange = () => {
    setFollow((follow) => !follow);
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
            {pods &&
              !!pods.length &&
              pods.map(({ metadata: { name } }) => (
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
            <ListSubheader color="inherit">Containers</ListSubheader>
            {(activePod?.spec.containers || []).map(({ name }: { name: string }) => (
              <MenuItem value={name} key={name}>
                {name}
              </MenuItem>
            ))}
            {activePod?.spec?.initContainers?.length && (
              <ListSubheader color="inherit">Init Containers</ListSubheader>
            )}
            {(activePod?.spec.initContainers || []).map(({ name }: { name: string }) => (
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
        <FormControlLabel
          className={classes.switchControl}
          label={'Follow'}
          control={
            <Switch
              checked={follow}
              onChange={handleFollowChange}
              name="follow"
              color="primary"
              size="small"
            />
          }
        />,
      ]}
    />
  );
};

export const PodsLogViewer: React.FC<PodsLogViewerProps> = ({ pods, getDefaultContainer }) => {
  const firstPod = pods?.[0];

  const [activePod, setActivePod] = React.useState<PodKubeObjectInterface>(firstPod);
  const [container, setContainer] = React.useState<string>(getDefaultContainer(firstPod));

  const handlePodChange = React.useCallback(
    (event: any) => {
      const newPodName = event.target.value;
      const newPod = pods.find(({ metadata: { name } }) => name === newPodName);
      if (newPod) {
        setActivePod(newPod);
        setContainer(getDefaultContainer(newPod));
      }
    },
    [getDefaultContainer, pods]
  );

  return (
    <PodsLogViewerInner
      pods={pods}
      activePod={activePod}
      handlePodChange={handlePodChange}
      container={container}
      setContainer={setContainer}
    />
  );
};
