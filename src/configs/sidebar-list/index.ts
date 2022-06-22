import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPComponentKubeObjectConfig } from '../../k8s/EDPComponent/config';
import { SidebarItem } from '../../routes/types';
import { createNewSidebarItem } from '../../utils/routes/createNewSidebarItem';
import { createRouteItemName } from '../../utils/routes/createRouteItemName'
import { createSidebarRouteURLBasedOnName } from '../../utils/routes/createSidebarRouteURLBasedOnName'

export const SIDEBAR_LIST: SidebarItem[] = [
    {
        parentName: null,
        itemLabel: 'EDP',
        itemName: createRouteItemName('root'),
        url: createSidebarRouteURLBasedOnName(EDPComponentKubeObjectConfig.name.pluralForm),
        opts: {
            icon: 'ion:rocket-outline',
        },
    },
    createNewSidebarItem(
        'Overview',
        EDPComponentKubeObjectConfig.name.pluralForm,
        'mdi:application-cog',
        'edp-root'
    ),
    createNewSidebarItem(
        'Applications',
        EDPCodebaseKubeObjectConfig.name.pluralForm,
        'mdi:application-brackets',
        'edp-root'
    ),
];
