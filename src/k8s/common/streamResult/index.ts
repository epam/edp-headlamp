import { ApiProxy } from '@kinvolk/headlamp-plugin/lib';
import {
    ApiError,
    StreamErrCb,
    StreamResultsCb,
} from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';

export const streamResult = (
    url: string,
    name: string,
    cb: StreamResultsCb,
    errCb: StreamErrCb
): (() => void) => {
    let isCancelled = false;
    let socket: ReturnType<typeof ApiProxy.stream>;
    run();

    return cancel;

    async function run() {
        try {
            const item = await ApiProxy.request(`${url}/${name}`);
            if (isCancelled) return;
            cb(item);

            const fieldSelector = encodeURIComponent(`metadata.name=${name}`);
            const watchUrl = `${url}?watch=1&fieldSelector=${fieldSelector}`;

            socket = ApiProxy.stream(
                watchUrl,
                x => {
                    const currentVersion = parseInt(item.metadata.resourceVersion, 10);
                    const newVersion = parseInt(x.object.metadata.resourceVersion, 10);
                    if (currentVersion < newVersion) {
                        cb(x.object);
                    }
                },
                { isJson: true }
            );
        } catch (err) {
            if (errCb) errCb(err as ApiError, cancel);
        }
    }

    function cancel() {
        if (isCancelled) return;
        isCancelled = true;

        if (socket) socket.cancel();
    }
};
