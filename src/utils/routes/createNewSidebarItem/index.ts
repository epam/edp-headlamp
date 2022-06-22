import { SidebarItem } from '../../../routes/types';
import { createRouteItemName } from '../createRouteItemName';
import { createSidebarRouteURLBasedOnName } from '../createSidebarRouteURLBasedOnName';

export const createNewSidebarItem = (itemLabel, name, icon, parentName = null): SidebarItem => ({
    parentName,
    itemLabel,
    itemName: createRouteItemName(name),
    url: createSidebarRouteURLBasedOnName(name),
    opts: {
        icon,
    },
});
