import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Button, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { DocLink } from '../../components/DocLink';
import { EmptyList } from '../../components/EmptyList';
import { PageWrapper } from '../../components/PageWrapper';
import { codebaseTypeSelectOptions } from '../../configs/select-options/codebaseTypeSelectOptions';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { FORM_MODES } from '../../types/forms';
import { rem } from '../../utils/styling/rem';
import { CodebaseActionsMenu } from '../../widgets/CodebaseActionsMenu';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../widgets/CreateEditCodebase/constants';
import { CreateEditCodebaseDialogForwardedProps } from '../../widgets/CreateEditCodebase/types';
import { routeEDPGitServerList } from '../edp-configuration/pages/edp-gitserver-list/route';
import { ComponentList } from './components/ComponentList';

export const PageView = () => {
    const [type, setType] = React.useState<CODEBASE_TYPES>(CODEBASE_TYPES.ALL);
    const [items, error] = EDPCodebaseKubeObject.useList();
    const [gitServers] = EDPGitServerKubeObject.useList();
    const { setDialog } = useDialogContext();

    const filteredComponents = React.useMemo(
        () => (type !== CODEBASE_TYPES.ALL ? items.filter(el => el.spec.type === type) : items),
        [items, type]
    );

    const createEditCodebaseDialogForwardedProps: CreateEditCodebaseDialogForwardedProps =
        React.useMemo(() => ({ mode: FORM_MODES.CREATE }), []);

    const creationDisabled = gitServers === null || !gitServers?.length;
    const history = useHistory();

    const gitServersConfigurationPageRoute = Router.createRouteURL(routeEDPGitServerList.path);

    return (
        <PageWrapper>
            <SectionBox>
                <SectionFilterHeader
                    // @ts-ignore
                    title={
                        <Grid container alignItems={'center'} spacing={1}>
                            <Grid item>
                                <Typography variant={'h1'}>Components</Typography>
                            </Grid>
                            <Grid item>
                                <DocLink href={EDP_USER_GUIDE.APPLICATION_CREATE.url} />
                            </Grid>
                        </Grid>
                    }
                    headerStyle={'label'}
                    actions={[
                        <Box>
                            <Grid container spacing={1}>
                                <Grid item style={{ minWidth: rem(200) }}>
                                    <Select
                                        onChange={e => setType(e.target.value as CODEBASE_TYPES)}
                                        defaultValue={CODEBASE_TYPES.ALL}
                                        fullWidth
                                    >
                                        {codebaseTypeSelectOptions.map(
                                            ({ label, value, disabled = false }, idx) => {
                                                const key = `${label}::${idx}`;

                                                return (
                                                    <MenuItem
                                                        value={value}
                                                        key={key}
                                                        disabled={disabled}
                                                    >
                                                        {label}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Button
                                        startIcon={<Icon icon={ICONS.PLUS} />}
                                        color={'primary'}
                                        variant={'contained'}
                                        disabled={creationDisabled}
                                        onClick={() =>
                                            setDialog({
                                                modalName: CREATE_EDIT_CODEBASE_DIALOG_NAME,
                                                forwardedProps:
                                                    createEditCodebaseDialogForwardedProps,
                                            })
                                        }
                                    >
                                        create
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>,
                    ]}
                />
                <ResourceActionListContextProvider>
                    {(items === null || !creationDisabled) && (
                        <ComponentList components={filteredComponents} error={error} />
                    )}
                    {items !== null && creationDisabled && (
                        <EmptyList
                            customText={'No Git Servers Connected.'}
                            linkText={'Click here to add a Git Server.'}
                            handleClick={() => history.push(gitServersConfigurationPageRoute)}
                        />
                    )}
                    <CodebaseActionsMenu />
                </ResourceActionListContextProvider>
            </SectionBox>
        </PageWrapper>
    );
};
