import { Dialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import {
    Box,
    DialogContent,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { PodKubeObject } from '../../k8s/Pod';
import { PodKubeObjectInterface } from '../../k8s/Pod/types';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { PODS_TERMINAL_DIALOG_NAME } from './constants';
import { PodsTerminalDialogForwardedProps } from './types';

// TODO this file is a copy of headlamp\frontend\src\components\common\Terminal.tsx

const decoder = new TextDecoder('utf-8');
const encoder = new TextEncoder();

enum Channel {
    StdIn = 0,
    StdOut,
    StdErr,
    ServerError,
    Resize,
}

const useStyle = makeStyles(theme => ({
    dialogContent: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .xterm ': {
            height: '100vh', // So the terminal doesn't stay shrunk when shrinking vertically and maximizing again.
            '& .xterm-viewport': {
                width: 'initial !important', // BugFix: https://github.com/xtermjs/xterm.js/issues/3564#issuecomment-1004417440
            },
        },
        '& #xterm-container': {
            overflow: 'hidden',
            width: '100%',
            '& .terminal.xterm': {
                padding: 10,
            },
        },
    },
    containerFormControl: {
        minWidth: '11rem',
    },
    terminalBox: {
        paddingTop: theme.spacing(1),
        flex: 1,
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column-reverse',
    },
}));

interface XTerminalConnected {
    xterm: XTerminal;
    connected: boolean;
    reconnectOnEnter: boolean;
}

type execReturn = ReturnType<PodKubeObject['exec']>;

export default function Terminal() {
    const {
        open,
        closeDialog,
        forwardedProps: { stageNamespace, appName, isAttach },
    } = useSpecificDialogContext<PodsTerminalDialogForwardedProps>(PODS_TERMINAL_DIALOG_NAME);

    const [items, setItems] = React.useState<PodKubeObjectInterface[]>(null);
    const [item, setItem] = React.useState<PodKubeObjectInterface>(null);
    const [, setError] = React.useState<unknown>(null);
    PodKubeObject.useApiList(
        (pods: PodKubeObjectInterface[]) => {
            setItems(pods);
            const newActivePod = pods[0];

            setItem(newActivePod);
            setContainer(
                newActivePod?.spec.containers.length > 0
                    ? newActivePod?.spec.containers[0].name
                    : ''
            );
        },
        error => {
            setError(error);
        },
        {
            labelSelector: `app.kubernetes.io/instance=${appName}`,
            namespace: stageNamespace,
        }
    );

    const classes = useStyle();
    const [terminalContainerRef, setTerminalContainerRef] = React.useState<HTMLElement | null>(
        null
    );
    const [container, setContainer] = React.useState<string | null>(null);
    const execOrAttachRef = React.useRef<execReturn | null>(null);
    const fitAddonRef = React.useRef<FitAddon | null>(null);
    const xtermRef = React.useRef<XTerminalConnected | null>(null);
    const [shells, setShells] = React.useState({
        available: getAvailableShells(),
        currentIdx: 0,
    });
    const { t } = useTranslation('resource');

    function getDefaultContainer() {
        return item?.spec.containers.length > 0 ? item?.spec.containers[0].name : '';
    }

    // @todo: Give the real exec type when we have it.
    function setupTerminal(containerRef: HTMLElement, xterm: XTerminal, fitAddon: FitAddon) {
        if (!containerRef) {
            return;
        }

        xterm.open(containerRef);

        xterm.onData(data => {
            send(0, data);
        });

        xterm.onResize(size => {
            send(4, `{"Width":${size.cols},"Height":${size.rows}}`);
        });

        // Allow copy/paste in terminal
        xterm.attachCustomKeyEventHandler(arg => {
            if (arg.ctrlKey && arg.type === 'keydown') {
                if (arg.code === 'KeyC') {
                    const selection = xterm.getSelection();
                    if (selection) {
                        return false;
                    }
                }
                if (arg.code === 'KeyV') {
                    return false;
                }
            }

            if (!isAttach && arg.type === 'keydown' && arg.code === 'Enter') {
                if (xtermRef.current?.reconnectOnEnter) {
                    setShells(shells => ({
                        ...shells,
                        currentIdx: 0,
                    }));
                    xtermRef.current!.reconnectOnEnter = false;
                    return false;
                }
            }

            return true;
        });

        fitAddon.fit();
    }

    function send(channel: number, data: string) {
        const socket = execOrAttachRef.current!.getSocket();

        // We should only send data if the socket is ready.
        if (!socket || socket.readyState !== 1) {
            console.debug('Could not send data to exec: Socket not ready...', socket);
            return;
        }

        const encoded = encoder.encode(data);
        const buffer = new Uint8Array([channel, ...encoded]);

        socket.send(buffer);
    }

    function onData(xtermc: XTerminalConnected, bytes: ArrayBuffer) {
        const xterm = xtermc.xterm;
        // Only show data from stdout, stderr and server error channel.
        const channel: Channel = new Int8Array(bytes.slice(0, 1))[0];
        if (channel < Channel.StdOut || channel > Channel.ServerError) {
            return;
        }

        // The first byte is discarded because it just identifies whether
        // this data is from stderr, stdout, or stdin.
        const data = bytes.slice(1);
        let text = decoder.decode(data);

        // to check if we are connecting to the socket for the first time
        let firstConnect = false;
        // Send resize command to server once connection is establised.
        if (!xtermc.connected) {
            xterm.clear();
            (async function () {
                send(4, `{"Width":${xterm.cols},"Height":${xterm.rows}}`);
            })();
            // On server error, don't set it as connected
            if (channel !== Channel.ServerError) {
                xtermc.connected = true;
                firstConnect = true;
                console.debug('Terminal is now connected');
            }
        }

        if (isSuccessfulExitError(channel, text)) {
            if (!!closeDialog) {
                closeDialog();
            }

            if (execOrAttachRef.current) {
                execOrAttachRef.current?.cancel();
            }

            return;
        }

        if (isShellNotFoundError(channel, text)) {
            shellConnectFailed(xtermc);
            return;
        }
        if (isAttach) {
            // in case of attach if we didn't recieve any data from the process we should notify the user that if any data comes
            // we will be showing it in the terminal
            if (firstConnect && !text) {
                text =
                    t(
                        "Any new output for this container's process should be shown below. In case it doesn't show up, press enter…"
                    ) + '\r\n';
            }
            text = text.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
        }
        console.log(text);
        xterm.write(text);
    }

    function tryNextShell() {
        if (!isAttach && shells.available.length > 0) {
            setShells(currentShell => ({
                ...currentShell,
                currentIdx: (currentShell.currentIdx + 1) % currentShell.available.length,
            }));
        }
    }

    function isLastShell() {
        return shells.currentIdx === shells.available.length - 1;
    }

    function getCurrentShellCommand() {
        return shells.available[shells.currentIdx];
    }

    function shellConnectFailed(xtermc: XTerminalConnected) {
        const xterm = xtermc.xterm;
        const command = getCurrentShellCommand();
        if (isLastShell()) {
            if (xtermc.connected) {
                xterm.write(t('Failed to run "{{command}}"…', { command }) + '\r\n');
            } else {
                xterm.clear();
                xterm.write(t('Failed to connect…') + '\r\n');
            }

            xterm.write('\r\n' + t('Press the enter key to reconnect.') + '\r\n');
            if (xtermRef.current) {
                xtermRef.current.reconnectOnEnter = true;
            }
        } else {
            xterm.write(t('Failed to run "{{ command }}"', { command }) + '\r\n');
            tryNextShell();
        }
    }

    React.useEffect(
        () => {
            // We need a valid container ref for the terminal to add itself to it.
            if (terminalContainerRef === null) {
                return;
            }

            // Don't do anything until the pod's container is assigned. We used the pod's late
            // assignment to prevent calling exec before the dialog is opened.
            if (container === null) {
                return;
            }

            // Don't do anything if the dialog is not open.
            if (!open) {
                return;
            }

            if (xtermRef.current) {
                xtermRef.current.xterm.dispose();
                execOrAttachRef.current?.cancel();
            }

            const isWindows =
                ['Windows', 'Win16', 'Win32', 'WinCE'].indexOf(navigator?.platform) >= 0;
            xtermRef.current = {
                xterm: new XTerminal({
                    cursorBlink: true,
                    cursorStyle: 'underline',
                    scrollback: 10000,
                    rows: 30, // initial rows before fit
                    windowsMode: isWindows,
                }),
                connected: false,
                reconnectOnEnter: false,
            };

            fitAddonRef.current = new FitAddon();
            xtermRef.current.xterm.loadAddon(fitAddonRef.current);

            (async function () {
                if (isAttach) {
                    xtermRef?.current?.xterm.writeln(
                        t('Trying to attach to the container {{ container }}…', { container }) +
                            '\n'
                    );

                    execOrAttachRef.current = await item?.attach(
                        container,
                        (items: ArrayBuffer) => onData(xtermRef.current!, items),
                        { failCb: () => shellConnectFailed(xtermRef.current!) }
                    );
                } else {
                    const command = getCurrentShellCommand();

                    xtermRef?.current?.xterm.writeln(`Trying to run "${command}"…\n`);

                    execOrAttachRef.current = await item?.exec(
                        container,
                        (items: ArrayBuffer) => onData(xtermRef.current!, items),
                        { command: [command], failCb: () => shellConnectFailed(xtermRef.current!) }
                    );
                }
                setupTerminal(terminalContainerRef, xtermRef.current!.xterm, fitAddonRef.current!);
            })();

            const handler = () => {
                fitAddonRef.current!.fit();
            };

            window.addEventListener('resize', handler);

            return function cleanup() {
                xtermRef.current?.xterm.dispose();
                execOrAttachRef.current?.cancel();
                window.removeEventListener('resize', handler);
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [container, terminalContainerRef, shells, open]
    );

    React.useEffect(
        () => {
            if (open && container === null) {
                setContainer(getDefaultContainer());
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [open]
    );

    React.useEffect(() => {
        if (!isAttach && shells.available.length === 0) {
            setShells({
                available: getAvailableShells(),
                currentIdx: 0,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);

    function getAvailableShells() {
        const selector = item?.spec?.nodeSelector || {};
        const os = selector['kubernetes.io/os'] || selector['beta.kubernetes.io/os'];
        if (os === 'linux') {
            return ['bash', '/bin/bash', 'sh', '/bin/sh'];
        } else if (os === 'windows') {
            return ['powershell.exe', 'cmd.exe'];
        }
        return ['bash', '/bin/bash', 'sh', '/bin/sh', 'powershell.exe', 'cmd.exe'];
    }

    function handleContainerChange(event: any) {
        setContainer(event.target.value);
    }

    function handlePodChange(event: any) {
        setItem(event.target.value);
    }

    function isSuccessfulExitError(channel: number, text: string): boolean {
        // Linux container Error
        if (channel === 3) {
            try {
                const error = JSON.parse(text);
                if (_.isEmpty(error.metadata) && error.status === 'Success') {
                    return true;
                }
            } catch {}
        }
        return false;
    }

    function isShellNotFoundError(channel: number, text: string): boolean {
        // Linux container Error
        if (channel === 3) {
            try {
                const error = JSON.parse(text);
                if (
                    error.code === 500 &&
                    error.status === 'Failure' &&
                    error.reason === 'InternalError'
                ) {
                    return true;
                }
            } catch {}
        }
        // Windows container Error
        if (channel === 1) {
            if (text.includes('The system cannot find the file specified')) {
                return true;
            }
        }
        return false;
    }

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            onFullScreenToggled={() => {
                setTimeout(() => {
                    fitAddonRef.current!.fit();
                }, 1);
            }}
            keepMounted
            withFullScreen
            title={isAttach ? `Attach: ${item?.metadata.name}` : `Terminal: ${item?.metadata.name}`}
        >
            <DialogContent className={classes.dialogContent}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item>
                            <FormControl className={classes.containerFormControl}>
                                <InputLabel shrink id="pod-name-chooser-terminal-label">
                                    Pod
                                </InputLabel>
                                <Select
                                    labelId="pod-name-chooser-terminal-label"
                                    id="pod-name-chooser-terminal"
                                    value={item ? item.metadata.name : ''}
                                    onChange={handlePodChange}
                                >
                                    {items &&
                                        items.length &&
                                        items.map(({ metadata: { name } }) => (
                                            <MenuItem value={name} key={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.containerFormControl}>
                                <InputLabel shrink id="container-name-chooser-label">
                                    Container
                                </InputLabel>
                                <Select
                                    labelId="container-name-chooser-label"
                                    id="container-name-chooser"
                                    value={container !== null ? container : getDefaultContainer()}
                                    onChange={handleContainerChange}
                                >
                                    {item &&
                                        item?.spec.containers.map(({ name }) => (
                                            <MenuItem value={name} key={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.terminalBox}>
                    <div
                        id="xterm-container"
                        ref={x => setTerminalContainerRef(x)}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column-reverse' }}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
