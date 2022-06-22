import { SidebarEntry } from '@kinvolk/headlamp-plugin/types/redux/reducers/ui';

export interface SidebarItem {
    parentName: string;
    itemName: string;
    itemLabel: string;
    url: string;
    opts?: Pick<SidebarEntry, 'useClusterURL' | 'icon'>;
}

export interface RouteURLProps {
    cluster?: string;
    [prop: string]: any;
}
