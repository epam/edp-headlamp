import { Icon } from '@iconify/react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { DocLink } from '../../components/DocLink';
import { Filter } from '../../components/Filter';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { codebaseTypeSelectOptions } from '../../configs/select-options/codebaseTypeSelectOptions';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { FORM_MODES } from '../../types/forms';
import { CodebaseActionsMenu } from '../../widgets/CodebaseActionsMenu';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../widgets/CreateEditCodebase/constants';
import { CreateEditCodebaseDialogForwardedProps } from '../../widgets/CreateEditCodebase/types';
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

    const noGitServers = gitServers === null || !gitServers?.length;

    return (
        <PageWrapper>
            <Section
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
                description={
                    <>
                        Generate diverse codebases, encompassing applications, libraries, autotests,
                        and Terraform infrastructure code. <br />
                        Manage your code by building codebases, creating branches, and accessing
                        detailed build pipeline diagrams.
                    </>
                }
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={2}
                            alignItems={'flex-end'}
                            justifyContent={'flex-end'}
                        >
                            <Grid item>
                                <Filter
                                    actions={
                                        <Box width="15rem">
                                            <FormControl fullWidth>
                                                <InputLabel shrink id="codebase-type">
                                                    Codebase Type
                                                </InputLabel>
                                                <Select
                                                    labelId="codebase-type"
                                                    onChange={e =>
                                                        setType(e.target.value as CODEBASE_TYPES)
                                                    }
                                                    defaultValue={CODEBASE_TYPES.ALL}
                                                    fullWidth
                                                >
                                                    {codebaseTypeSelectOptions.map(
                                                        (
                                                            { label, value, disabled = false },
                                                            idx
                                                        ) => {
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
                                            </FormControl>
                                        </Box>
                                    }
                                    onReset={() => setType(CODEBASE_TYPES.ALL)}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    startIcon={<Icon icon={ICONS.PLUS} />}
                                    color={'primary'}
                                    variant={'contained'}
                                    disabled={noGitServers}
                                    onClick={() =>
                                        setDialog({
                                            modalName: CREATE_EDIT_CODEBASE_DIALOG_NAME,
                                            forwardedProps: createEditCodebaseDialogForwardedProps,
                                        })
                                    }
                                >
                                    create
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceActionListContextProvider>
                            <ComponentList
                                items={filteredComponents}
                                error={error}
                                noGitServers={noGitServers}
                            />
                            <CodebaseActionsMenu />
                        </ResourceActionListContextProvider>
                    </Grid>
                </Grid>
            </Section>
        </PageWrapper>
    );
};
