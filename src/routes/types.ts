import { SidebarEntryProps } from '@kinvolk/headlamp-plugin/lib/components/Sidebar';

export interface SidebarItem {
  parentName: string | null;
  itemName: string;
  itemLabel: string;
  url: string;
  opts?: Pick<SidebarEntryProps, 'useClusterURL' | 'icon'>;
}
