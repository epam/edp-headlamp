import { SidebarItem } from '../../../routes/types';
import { createSidebarItemName } from '../createSidebarItemName';

export const createNewSidebarItem = (
  itemLabel: string,
  name: string,
  icon: string,
  parentName: string = null
): SidebarItem => ({
  parentName,
  itemLabel,
  itemName: createSidebarItemName(name),
  url: name,
  opts: {
    icon,
  },
});
