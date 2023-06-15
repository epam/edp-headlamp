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
import { List } from './routes';
import { SIDEBAR_LIST } from './routes/sidebar-list';

const additionalActions = [
    <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE} title={'EDP Headlamp User Guide'} />,
];

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

        for (const route of Object.values(List)) {
            registerRoute(route);
        }

        return true;
    }
}

Headlamp.registerPlugin('headlamp-edp', new EDPHeadlampPlugin());
