import { SidebarItem } from '../../../routes/types';
import { createRouteName } from '../createRouteName';
import { createSidebarItemName } from '../createSidebarItemName';

export const createNewSidebarItem = (itemLabel, name, icon, parentName = null): SidebarItem => ({
    parentName,
    itemLabel,
    itemName: createSidebarItemName(name),
    url: createRouteName(name),
    opts: {
        icon,
    },
});
