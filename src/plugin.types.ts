import type { CommonComponents, k8s, Router } from '@kinvolk/headlamp-plugin/lib';
import type { SidebarEntryProps } from '@kinvolk/headlamp-plugin/types/components/Sidebar';
import type {
    ApiError,
    StreamErrCb,
    StreamResultsCb,
} from '@kinvolk/headlamp-plugin/types/lib/k8s/apiProxy';
import type {
    KubeObject,
    KubeObjectInterface,
    StringDict,
} from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import type { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

export type { Router, k8s, CommonComponents };
export type { SidebarEntryProps };
export type { KubeObject, KubeObjectInterface, StringDict };
export type { ApiError, StreamErrCb, StreamResultsCb };
export type { SnackbarMessage, OptionsObject, SnackbarKey };
