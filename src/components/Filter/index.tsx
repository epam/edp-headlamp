import { Icon } from '@iconify/react';
import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { ClusterSettings } from '@kinvolk/headlamp-plugin/lib/helpers';
import { RootState } from '@kinvolk/headlamp-plugin/lib/redux/stores/store';
import {
    Box,
    Button,
    Checkbox,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

// NOTE This file has code blocks taken from headlamp-origin, because those are hard to customize and aren't exported correctly.

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const FILTER_SET_NAMESPACE = 'FILTER_SET_NAMESPACE';
export const FILTER_SET_SEARCH = 'FILTER_SET_SEARCH';
export const FILTER_RESET = 'FILTER_RESET';
export function setSearchFilter(searchTerms: string) {
    return { type: FILTER_SET_SEARCH, search: searchTerms };
}

export function setNamespaceFilter(namespaces: string[]) {
    return { type: FILTER_SET_NAMESPACE, namespaces: namespaces };
}

export function resetFilter() {
    return { type: FILTER_RESET };
}

export function getFilterValueByNameFromURL(key: string, location: any): string[] {
    const searchParams = new URLSearchParams(location.search);

    const filterValue = searchParams.get(key);
    if (!filterValue) {
        return [];
    }
    return filterValue.split(' ');
}

export function addQuery(
    queryObj: { [key: string]: string },
    queryParamDefaultObj: { [key: string]: string } = {},
    history: any,
    location: any,
    tableName = ''
) {
    const pathname = location.pathname;
    const searchParams = new URLSearchParams(location.search);

    if (!!tableName) {
        searchParams.set('tableName', tableName);
    }
    // Ensure that default values will not show up in the URL
    for (const key in queryObj) {
        const value = queryObj[key];
        if (value !== queryParamDefaultObj[key]) {
            searchParams.set(key, value);
        } else {
            searchParams.delete(key);
        }
    }

    history.push({
        pathname: pathname,
        search: searchParams.toString(),
    });
}

function loadClusterSettings(clusterName: string): ClusterSettings {
    if (!clusterName) {
        return {};
    }
    return JSON.parse(localStorage.getItem(`cluster_settings.${clusterName}`) || '{}');
}

export interface PureNamespacesAutocompleteProps {
    namespaceNames: string[];
    onChange: (event: React.ChangeEvent<{}>, newValue: string[]) => void;
    filter: { namespaces: Set<string>; search: string };
}

export function PureNamespacesAutocomplete({
    namespaceNames,
    onChange: onChangeFromProps,
    filter,
}: PureNamespacesAutocompleteProps) {
    const theme = useTheme();
    const { t } = useTranslation(['glossary', 'frequent']);
    const [namespaceInput, setNamespaceInput] = React.useState<string>('');
    const maxNamespacesChars = 12;

    const onInputChange = (event: object, value: string, reason: string) => {
        // For some reason, the AutoComplete component resets the text after a short
        // delay, so we need to avoid that or the user won't be able to edit/use what they type.
        if (reason !== 'reset') {
            setNamespaceInput(value);
        }
    };

    const onChange = (event: React.ChangeEvent<{}>, newValue: string[]) => {
        // Now we reset the input so it won't show next to the selected namespaces.
        setNamespaceInput('');
        onChangeFromProps(event, newValue);
    };

    return (
        <Autocomplete
            multiple
            id="namespaces-filter"
            autoComplete
            options={namespaceNames}
            onChange={onChange}
            onInputChange={onInputChange}
            inputValue={namespaceInput}
            // We reverse the namespaces so the last chosen appear as the first in the label. This
            // is useful since the label is ellipsized and this we get to see it change.
            value={[...filter.namespaces.values()].reverse()}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox
                        icon={<Icon icon="mdi:checkbox-blank-outline" />}
                        checkedIcon={<Icon icon="mdi:check-box-outline" />}
                        style={{
                            color: selected
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                        }}
                        checked={selected}
                    />
                    {option}
                </React.Fragment>
            )}
            renderTags={(tags: string[]) => {
                if (tags.length === 0) {
                    return <Typography variant="body2">{t('frequent|All namespaces')}</Typography>;
                }

                let namespacesToShow = tags[0];
                const joiner = ', ';
                const joinerLength = joiner.length;
                let joinnedNamespaces = 1;

                tags.slice(1).forEach(tag => {
                    if (namespacesToShow.length + tag.length + joinerLength <= maxNamespacesChars) {
                        namespacesToShow += joiner + tag;
                        joinnedNamespaces++;
                    }
                });

                return (
                    <Typography style={{ overflowWrap: 'anywhere' }}>
                        {namespacesToShow.length > maxNamespacesChars
                            ? namespacesToShow.slice(0, maxNamespacesChars) + '…'
                            : namespacesToShow}
                        {tags.length > joinnedNamespaces && (
                            <>
                                <span>,&nbsp;</span>
                                <b>{`+${tags.length - joinnedNamespaces}`}</b>
                            </>
                        )}
                    </Typography>
                );
            }}
            renderInput={params => (
                <Box width="15rem">
                    <TextField
                        {...params}
                        variant="standard"
                        label={t('Namespaces')}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        style={{ marginTop: 0 }}
                        placeholder={[...filter.namespaces.values()].length > 0 ? '' : 'Filter'}
                    />
                </Box>
            )}
        />
    );
}

export function NamespacesAutocomplete() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const filter = useTypedSelector(state => state.filter);
    const cluster = K8s.useCluster();
    const [namespaceNames, setNamespaceNames] = React.useState<string[]>([]);

    React.useEffect(() => {
        const settings = loadClusterSettings(cluster || '');
        const allowedNamespaces = settings?.allowedNamespaces || [];
        if (allowedNamespaces.length > 0) {
            setNamespaceNames(allowedNamespaces);
        }
    }, [cluster]);

    const onChange = (event: React.ChangeEvent<{}>, newValue: string[]) => {
        addQuery({ namespace: newValue.join(' ') }, { namespace: '' }, history, location, '');
        dispatch(setNamespaceFilter(newValue));
    };

    return namespaceNames.length > 0 ? (
        <PureNamespacesAutocomplete
            namespaceNames={namespaceNames}
            onChange={onChange}
            filter={filter}
        />
    ) : (
        <NamespacesFromClusterAutocomplete onChange={onChange} filter={filter} />
    );
}

function NamespacesFromClusterAutocomplete(
    props: Omit<PureNamespacesAutocompleteProps, 'namespaceNames'>
) {
    const [namespaceNames, setNamespaceNames] = React.useState<string[]>([]);

    K8s.namespace.default.useApiList((namespaces: K8s.namespace.default[]) => {
        setNamespaceNames(namespaces.map(namespace => namespace.metadata.name));
    });

    return <PureNamespacesAutocomplete namespaceNames={namespaceNames} {...props} />;
}

interface FilterProps {
    noNamespaceFilter?: boolean;
    noSearch?: boolean;
    preRenderFromFilterActions?: React.ReactNode[];
    actions?: React.ReactElement;
    onReset?(): void;
}

export const Filter = (props: FilterProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('frequent');
    const history = useHistory();

    const { noNamespaceFilter = false, noSearch = false, actions: propsActions, onReset } = props;
    const filter = useTypedSelector(state => state.filter);

    const hasNamespaceFilters = !noNamespaceFilter && filter.namespaces.size > 0;
    const hasSearch = !noSearch && !!filter.search;

    const [showFilters, setShowFilters] = React.useState<{ show: boolean; userTriggered: boolean }>(
        {
            show: hasNamespaceFilters || hasSearch,
            userTriggered: false,
        }
    );

    function resetFilters() {
        addQuery({ namespace: '' }, { namespace: '' }, history, location);
        dispatch(resetFilter());
        setShowFilters({ show: false, userTriggered: true });

        if (onReset) {
            onReset();
        }
    }

    useHotkeys('ctrl+shift+f', () => {
        if (!noSearch || !noNamespaceFilter) {
            setShowFilters({ show: true, userTriggered: true });
        }
    });

    const focusedRef = React.useCallback(node => {
        if (node !== null) {
            node.focus();
        }
    }, []);

    React.useEffect(
        () => {
            const namespace = getFilterValueByNameFromURL('namespace', location);
            if (namespace.length > 0) {
                const namespaceFromStore = [...filter.namespaces].sort();
                if (
                    namespace
                        .slice()
                        .sort()
                        .every(
                            (value: string, index: number) => value !== namespaceFromStore[index]
                        )
                ) {
                    dispatch(setNamespaceFilter(namespace));
                    if (!noNamespaceFilter) {
                        setShowFilters({ show: true, userTriggered: false });
                    }
                }
            }
            // We don't want the search to be used globally, but we're using Redux with it because
            // this way we manage it the same way as with the other filters.
            return function cleanup() {
                dispatch(setSearchFilter(''));
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    React.useEffect(() => {
        setShowFilters(state => {
            return {
                show: hasSearch || hasNamespaceFilters || state.userTriggered,
                userTriggered: state.userTriggered,
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasSearch]);

    return (
        <Grid container spacing={2} alignItems={'flex-end'}>
            {showFilters.show ? (
                <>
                    {!noNamespaceFilter && (
                        <Grid item>
                            <NamespacesAutocomplete />
                        </Grid>
                    )}
                    {!noSearch && (
                        <Grid item>
                            <Box width="15rem">
                                <TextField
                                    fullWidth
                                    id="standard-search"
                                    label={t('Search')}
                                    type="search"
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ role: 'search' }}
                                    placeholder={t('Filter')}
                                    value={filter.search}
                                    onChange={event => {
                                        dispatch(setSearchFilter(event.target.value));
                                        setShowFilters({ show: true, userTriggered: true });
                                    }}
                                    inputRef={focusedRef}
                                />
                            </Box>
                        </Grid>
                    )}
                    {!!propsActions ? <Grid item>{propsActions}</Grid> : null}
                    <Grid item>
                        <Tooltip title={'Reset Filter'}>
                            <Button
                                variant="contained"
                                endIcon={<Icon icon="mdi:filter-variant-remove" />}
                                onClick={resetFilters}
                                aria-controls="standard-search"
                            >
                                {t('Clear')}
                            </Button>
                        </Tooltip>
                    </Grid>
                </>
            ) : (
                <Grid item>
                    <Tooltip title={'Enable Filtering'}>
                        <IconButton
                            aria-label={t('Show filter')}
                            onClick={() => setShowFilters({ show: true, userTriggered: true })}
                        >
                            <Icon icon="mdi:filter-variant" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            )}
        </Grid>
    );
};
