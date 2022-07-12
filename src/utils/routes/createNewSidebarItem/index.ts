import { SidebarItem } from '../../../routes/types';
import { createRouteName } from '../createRouteName';
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
    url: createRouteName(name),
    opts: {
        icon,
    },
});
