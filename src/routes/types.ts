import { SidebarEntryProps } from '@kinvolk/headlamp-plugin/lib/components/Sidebar';

export interface SidebarItem {
    parentName: string;
    itemName: string;
    itemLabel: string;
    url: string;
    opts?: Pick<SidebarEntryProps, 'useClusterURL' | 'icon'>;
}
