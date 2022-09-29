import { pluginLib } from '../../../plugin.globals';
import { ApiError, StreamErrCb, StreamResultsCb } from '../../../plugin.types';
const { ApiProxy } = pluginLib;

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

            socket = ApiProxy.stream(watchUrl, x => cb(x.object), { isJson: true });
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
