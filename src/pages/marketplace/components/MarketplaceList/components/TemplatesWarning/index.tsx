import { Router } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EmptyList } from '../../../../../../components/EmptyList';
import { routeGitServerList } from '../../../../../configuration/pages/gitservers/route';

export const TemplatesWarning = () => {
  const history = useHistory();
  const gitServersConfigurationPageRoute = Router.createRouteURL(routeGitServerList.path);

  return (
    <EmptyList
      customText={'No Git Servers Connected.'}
      linkText={'Click here to add a Git Server.'}
      handleClick={() => history.push(gitServersConfigurationPageRoute)}
    />
  );
};
