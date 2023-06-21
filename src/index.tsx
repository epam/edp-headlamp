import './override.css';
import {
    Headlamp,
    Plugin,
    registerAppBarAction,
    registerRoute,
    registerSidebarEntry,
} from '@kinvolk/headlamp-plugin/lib';
import { DocLink } from './components/DocLink';
import { URL_EDP_HEADLAMP_USER_GUIDE } from './constants/urls';
import routes from './routes';
import { SIDEBAR_LIST } from './routes/sidebar-list';

const additionalActions = [<DocLink href={URL_EDP_HEADLAMP_USER_GUIDE} />];

class EDPHeadlampPlugin extends Plugin {
    initialize() {
        for (const action of additionalActions) {
            registerAppBarAction(action);
        }

        for (const { parentName, itemName, itemLabel, url, opts } of SIDEBAR_LIST) {
            registerSidebarEntry({
                parent: parentName,
                name: itemName,
                label: itemLabel,
                url,
                icon: opts.icon,
                useClusterURL: opts.useClusterURL,
            });
        }

        for (const route of routes) {
            registerRoute(route);
        }

        return true;
    }
}

Headlamp.registerPlugin('headlamp-edp', new EDPHeadlampPlugin());
