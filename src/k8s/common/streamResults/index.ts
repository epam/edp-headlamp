import { ApiProxy } from '@kinvolk/headlamp-plugin/lib';
import {
    ApiError,
    StreamErrCb,
    StreamResultsCb,
} from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { EDPKubeObjectInterface } from '../../../types/k8s';

export const streamResults = (
    url: string,
    cb: StreamResultsCb,
    errCb: StreamErrCb,
    urlParams?: { [name: string]: string }
): (() => void) => {
    const results: {
        [uid: string]: EDPKubeObjectInterface;
    } = {};
    let isCancelled = false;
    let socket: ReturnType<typeof ApiProxy.stream>;

    run();

    return cancel;

    async function run() {
        try {
            const requestParams = new URLSearchParams(urlParams);
            const requestUrl = `${url}?${requestParams.toString()}`;

            const { kind, items, metadata } = await ApiProxy.request(requestUrl);

            if (isCancelled) return;

            add(items, kind);

            const watchParams = new URLSearchParams({
                ...urlParams,
                watch: '1',
                resourceVersion: metadata.resourceVersion,
            });
            const watchUrl = `${url}?${watchParams.toString()}`;
            socket = ApiProxy.stream(watchUrl, update, { isJson: true });
        } catch (err) {
            if (errCb) errCb(err as ApiError, cancel);
        }
    }

    function cancel() {
        if (isCancelled) return;
        isCancelled = true;

        if (socket) socket.cancel();
    }

    function add(items: EDPKubeObjectInterface[], kind: string) {
        const fixedKind = kind.slice(0, -4); // Trim off the word "List" from the end of the string
        for (const item of items) {
            item.kind = fixedKind;
            results[item.metadata.uid] = item;
        }

        push();
    }

    function update({
        type,
        object,
    }: {
        type: 'ADDED' | 'MODIFIED' | 'DELETED' | 'ERROR';
        object: EDPKubeObjectInterface;
    }) {
        object.actionType = type; // eslint-disable-line no-param-reassign

        switch (type) {
            case 'ADDED':
                results[object.metadata.uid] = object;
                break;
            case 'MODIFIED': {
                const existing = results[object.metadata.uid];
                if (existing) {
                    const currentVersion = parseInt(existing.metadata.resourceVersion, 10);
                    const newVersion = parseInt(object.metadata.resourceVersion, 10);
                    if (currentVersion < newVersion) {
                        Object.assign(existing, object);
                    }
                } else {
                    results[object.metadata.uid] = object;
                }

                break;
            }
            case 'DELETED':
                delete results[object.metadata.uid];
                break;
            case 'ERROR':
                console.error('Error in update', { type, object });
                break;
            default:
                console.error('Unknown update type', type);
        }

        push();
    }

    function push() {
        const values = Object.entries(results)
            .sort()
            .map(([, value]) => value);
        cb(values);
    }
};
