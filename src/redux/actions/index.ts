import { CLUSTER_ACTION } from '../types';
import { CallbackActionOptions } from './types';

export const clusterAction = (
    callback: (...args: any[]) => void,
    actionOptions: CallbackActionOptions = {}
) => ({
    type: CLUSTER_ACTION,
    callback,
    ...actionOptions,
});
