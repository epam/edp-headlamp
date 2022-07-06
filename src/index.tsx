import './override.css';
import { Headlamp, Plugin, Registry } from '@kinvolk/headlamp-plugin/lib';
import { SIDEBAR_LIST } from './configs/sidebar-list';
import { List } from './routes';

class EDPHeadlampPlugin extends Plugin {
    initialize(registry: Registry) {
        SIDEBAR_LIST.forEach(({ parentName, itemName, itemLabel, url, opts }) =>
            registry.registerSidebarItem(parentName, itemName, itemLabel, url, opts)
        );
        Object.keys(List).forEach(routeName => registry.registerRoute(List[routeName]));

        return true;
    }
}

Headlamp.registerPlugin('headlamp-edp', new EDPHeadlampPlugin());
