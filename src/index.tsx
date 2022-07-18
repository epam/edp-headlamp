import './override.css';
import { Headlamp, Plugin, registerRoute,registerSidebarEntry } from '@kinvolk/headlamp-plugin/lib';
import { SIDEBAR_LIST } from './configs/sidebar-list';
import { List } from './routes';

class EDPHeadlampPlugin extends Plugin {
    initialize() {
        for (const { parentName, itemName, itemLabel, url, opts } of SIDEBAR_LIST) {
            registerSidebarEntry({
                parent: parentName,
                name: itemName,
                label: itemLabel,
                url,
                icon: opts.icon,
                useClusterURL: opts.useClusterURL,
            })
        }

        for (const route of Object.values(List)) {
            registerRoute(route)
        }

        return true;
    }
}

Headlamp.registerPlugin('headlamp-edp', new EDPHeadlampPlugin());
