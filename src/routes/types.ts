import { SidebarEntryProps } from '@kinvolk/headlamp-plugin/types/components/Sidebar'

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
