import type { CommonComponents, k8s, Router } from '@kinvolk/headlamp-plugin/lib';
import type {
    ApiError,
    StreamErrCb,
    StreamResultsCb,
} from '@kinvolk/headlamp-plugin/lib/K8s/apiProxy';
import type { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import type { SidebarEntryProps } from '@kinvolk/headlamp-plugin/types/components/Sidebar';

export type { Router, k8s, CommonComponents };
export type { SidebarEntryProps };
export type { KubeObject };
export type { ApiError, StreamErrCb, StreamResultsCb };
