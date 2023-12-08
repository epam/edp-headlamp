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
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { codebaseTypeSelectOptions } from '../../configs/select-options/codebaseTypeSelectOptions';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { Filter } from '../../providers/Filter/components/Filter';
import { useFilterContext } from '../../providers/Filter/hooks';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { FORM_MODES } from '../../types/forms';
import { CodebaseActionsMenu } from '../../widgets/CodebaseActionsMenu';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../widgets/CreateEditCodebase/constants';
import { CreateEditCodebaseDialogForwardedProps } from '../../widgets/CreateEditCodebase/types';
import { ComponentList } from './components/ComponentList';

type PageFilterExtraControls = 'codebaseType';

export const PageView = () => {
    const [items, error] = EDPCodebaseKubeObject.useList();
    const [gitServers] = EDPGitServerKubeObject.useList();
    const { setDialog } = useDialogContext();

    const createEditCodebaseDialogForwardedProps: CreateEditCodebaseDialogForwardedProps =
        React.useMemo(() => ({ mode: FORM_MODES.CREATE }), []);

    const noGitServers = gitServers === null || !gitServers?.length;

    const { filter, setFilter, filterFunction } = useFilterContext<PageFilterExtraControls>();

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
                    'Create, view, and manage diverse codebases, encompassing applications, libraries, autotests, and Terraform infrastructure code.'
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
                                <Filter<PageFilterExtraControls>
                                    controls={{
                                        search: true,
                                        namespace: true,
                                        codebaseType: (
                                            <Box width="15rem">
                                                <FormControl fullWidth>
                                                    <InputLabel shrink id="codebase-type">
                                                        Codebase Type
                                                    </InputLabel>
                                                    <Select
                                                        labelId="codebase-type"
                                                        onChange={e =>
                                                            setFilter(prev => ({
                                                                ...prev,
                                                                values: {
                                                                    ...prev.values,
                                                                    codebaseType: e.target.value,
                                                                },
                                                                matchFunctions: {
                                                                    ...prev.matchFunctions,
                                                                    codebaseType: item => {
                                                                        if (
                                                                            e.target.value ===
                                                                            CODEBASE_TYPES.ALL
                                                                        ) {
                                                                            return true;
                                                                        }

                                                                        return (
                                                                            item.spec.type ===
                                                                            e.target.value
                                                                        );
                                                                    },
                                                                },
                                                            }))
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
                                        ),
                                    }}
                                    filter={filter}
                                    setFilter={setFilter}
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
                                items={items}
                                error={error}
                                noGitServers={noGitServers}
                                filterFunction={filterFunction}
                            />
                            <CodebaseActionsMenu />
                        </ResourceActionListContextProvider>
                    </Grid>
                </Grid>
            </Section>
        </PageWrapper>
    );
};
