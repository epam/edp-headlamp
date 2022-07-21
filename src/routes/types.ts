import type { SidebarEntryProps } from '../plugin.types';

export interface SidebarItem {
    parentName: string;
    itemName: string;
    itemLabel: string;
    url: string;
    opts?: Pick<SidebarEntryProps, 'useClusterURL' | 'icon'>;
}

export interface RouteURLProps {
    cluster?: string;
    [prop: string]: any;
}
