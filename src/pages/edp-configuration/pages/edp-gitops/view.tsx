import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Button, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EmptyList } from '../../../../components/EmptyList';
import { StatusIcon } from '../../../../components/StatusIcon';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import {
  CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE,
  CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE,
} from '../../../../k8s/EDPCodebase/labels';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { rem } from '../../../../utils/styling/rem';
import { ManageGitOps } from '../../../../widgets/ManageGitOps';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { routeEDPGitServerList } from '../edp-gitserver-list/route';
import { GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const [codebases, codebasesError] = EDPCodebaseKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE}=${CODEBASE_TYPES.SYSTEM}`,
  });

  const itemsArray = React.useMemo(() => (codebases ? codebases.filter(Boolean) : []), [codebases]);

  const gitOpsCodebase =
    itemsArray.find(
      (el) => el.metadata.labels[CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE] === 'gitops'
    ) ?? null;

  const configurationItemList = React.useMemo(
    () =>
      itemsArray.map((el) => {
        const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

        const status = el?.status?.status;
        const [icon, color, isRotating] = EDPCodebaseKubeObject.getStatusIcon(status);

        return {
          id: el?.metadata?.name || el?.metadata?.uid,
          title: (
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item style={{ marginRight: rem(5) }}>
                <StatusIcon
                  icon={icon}
                  color={color}
                  isRotating={isRotating}
                  Title={
                    <>
                      <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                        {`Status: ${status || 'Unknown'}`}
                      </Typography>
                      {status === CUSTOM_RESOURCE_STATUSES.FAILED && (
                        <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                          {el?.status?.detailedMessage}
                        </Typography>
                      )}
                    </>
                  }
                />
              </Grid>
              <Grid item>GitOps</Grid>
              <Grid item sx={{ ml: 'auto' }}>
                <Button
                  component={Link}
                  href={el?.status?.gitWebUrl}
                  target="_blank"
                  startIcon={<Icon icon={ICONS.GIT_BRANCH} width="15" height="15" />}
                >
                  Go to the Source Code
                </Button>
              </Grid>
            </Grid>
          ),
          ownerReference,
          component: (
            <ManageGitOps
              formData={{
                currentElement: el,
                isReadOnly: true,
              }}
            />
          ),
        };
      }),
    [itemsArray]
  );

  const creationDisabled = React.useMemo(
    () => (gitOpsCodebase === null ? false : !!gitOpsCodebase),
    [gitOpsCodebase]
  );

  const [gitServers] = EDPGitServerKubeObject.useList();
  const history = useHistory();

  const gitServersConfigurationPageRoute = Router.createRouteURL(routeEDPGitServerList.path);

  return (
    <ConfigurationBody
      pageData={{
        label: GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION.label,
        description: GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION.description,
        docUrl: EDP_USER_GUIDE.GIT_OPS.url,
      }}
      blocker={
        gitServers !== null && !gitServers?.length ? (
          <EmptyList
            customText={'No Git Servers Connected.'}
            linkText={'Click here to add a Git Server.'}
            handleClick={() => history.push(gitServersConfigurationPageRoute)}
          />
        ) : null
      }
      renderPlaceHolderData={({ handleClosePlaceholder }) => ({
        title: 'Add GitOps Repository',
        disabled: creationDisabled,
        component: (
          <ManageGitOps
            formData={{
              currentElement: 'placeholder',
              handleClosePlaceholder,
            }}
          />
        ),
      })}
      items={codebases === null && !codebasesError ? null : configurationItemList}
      error={codebasesError}
      emptyMessage={'No GitOps repositories found'}
      onlyOneItem
    />
  );
};
