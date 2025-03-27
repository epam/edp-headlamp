import './override.css';
import {
  Headlamp,
  Plugin,
  registerAppBarAction,
  registerAppLogo,
  registerRoute,
  registerSidebarEntry,
} from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { Logo } from './Logo';
import routes from './routes';
import { SIDEBAR_LIST } from './routes/sidebar-list';
import { AiChatWrapper } from './widgets/AIChat';
import { HelpMenu } from './widgets/HelpMenu';
import { ResourceQuotas } from './widgets/ResourceQuotas';

const additionalActions = [<ResourceQuotas />, <AiChatWrapper />, <HelpMenu />];

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
        icon: opts?.icon,
        useClusterURL: opts?.useClusterURL,
      });
    }

    for (const route of routes) {
      registerRoute(route);
    }

    registerAppLogo(Logo);

    return true;
  }
}

Headlamp.registerPlugin('headlamp-edp', new EDPHeadlampPlugin());
