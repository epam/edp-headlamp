import './override.css';
import {
    Headlamp,
    Plugin,
    registerAppBarAction,
    registerAppLogo,
    registerRoute,
    registerSidebarEntry,
} from '@kinvolk/headlamp-plugin/lib';
import { LogoWithText } from './Logo';
import routes from './routes';
import { SIDEBAR_LIST } from './routes/sidebar-list';
import { HelpMenu } from './widgets/HelpMenu';

const additionalActions = [<HelpMenu />];

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

        registerAppLogo(LogoWithText);

        return true;
    }
}

Headlamp.registerPlugin('headlamp-edp', new EDPHeadlampPlugin());
