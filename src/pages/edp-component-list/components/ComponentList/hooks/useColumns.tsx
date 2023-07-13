import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { Render } from '../../../../../components/Render';
import { StatusIcon } from '../../../../../components/StatusIcon';
import {
    BUILD_TOOL_ICON_MAPPING,
    CI_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../../../../configs/icon-mappings';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { RESOURCE_ICON_NAMES } from '../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../icons/UseSpriteSymbol';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { useResourceActionListContext } from '../../../../../providers/ResourceActionList/hooks';
import { HeadlampKubeObject } from '../../../../../types/k8s';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { sortByStatus } from '../../../../../utils/sort/sortByStatus';
import { rem } from '../../../../../utils/styling/rem';
import { routeEDPComponentDetails } from '../../../../edp-component-details/route';

export const useColumns = (): HeadlampSimpleTableGetterColumn<
    HeadlampKubeObject<EDPCodebaseKubeObjectInterface>
>[] => {
    const { handleOpenResourceActionListMenu } = useResourceActionListContext();

    return React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status: codebaseStatus }) => {
                    const status = codebaseStatus
                        ? codebaseStatus.status
                        : CUSTOM_RESOURCE_STATUSES['UNKNOWN'];

                    const title = (
                        <>
                            <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                {capitalizeFirstLetter(status)}
                            </Typography>
                            <Render condition={status === CUSTOM_RESOURCE_STATUSES['FAILED']}>
                                <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                                    {codebaseStatus?.detailedMessage}
                                </Typography>
                            </Render>
                        </>
                    );

                    return <StatusIcon status={status} customTitle={title} />;
                },
                sort: (a, b) => sortByStatus(a.status.status, b.status.status),
            },
            {
                label: 'Name',
                getter: ({ metadata: { name, namespace } }) => {
                    return (
                        <Link
                            routeName={routeEDPComponentDetails.path}
                            params={{
                                name,
                                namespace,
                            }}
                        >
                            {name}
                        </Link>
                    );
                },
                sort: (a, b) => sortByName(a.metadata.name, b.metadata.name),
            },
            {
                label: 'Type',
                getter: ({ spec: { type } }) => capitalizeFirstLetter(type),
            },
            {
                label: 'Language',
                getter: ({ spec: { lang, type } }) => {
                    const codebaseMapping = getCodebaseMappingByCodebaseType(type);
                    if (!codebaseMapping) {
                        return lang;
                    }

                    return (
                        <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                            <Grid item>
                                <UseSpriteSymbol
                                    name={
                                        LANGUAGE_ICON_MAPPING?.[lang?.toLowerCase()] ||
                                        RESOURCE_ICON_NAMES.OTHER
                                    }
                                    width={20}
                                    height={20}
                                />
                            </Grid>
                            <Grid item>{codebaseMapping?.[lang]?.language?.name || lang}</Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByName(a.spec.lang, b.spec.lang),
            },
            {
                label: 'Framework',
                getter: ({ spec: { lang, framework, type } }) => {
                    const codebaseMapping = getCodebaseMappingByCodebaseType(type);

                    if (!codebaseMapping) {
                        return framework;
                    }

                    return (
                        <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                            <Grid item>
                                <UseSpriteSymbol
                                    name={
                                        FRAMEWORK_ICON_MAPPING?.[framework?.toLowerCase()] ||
                                        RESOURCE_ICON_NAMES.OTHER
                                    }
                                    width={20}
                                    height={20}
                                />
                            </Grid>
                            <Grid item>
                                {codebaseMapping?.[lang]?.frameworks?.[framework]?.name ||
                                    framework}
                            </Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByName(a.spec.framework, b.spec.framework),
            },
            {
                label: 'Build Tool',
                getter: ({ spec: { lang, buildTool, type } }) => {
                    const codebaseMapping = getCodebaseMappingByCodebaseType(type);

                    if (!codebaseMapping) {
                        return buildTool;
                    }

                    return (
                        <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                            <Grid item>
                                <UseSpriteSymbol
                                    name={
                                        BUILD_TOOL_ICON_MAPPING?.[buildTool?.toLowerCase()] ||
                                        RESOURCE_ICON_NAMES.OTHER
                                    }
                                    width={20}
                                    height={20}
                                />
                            </Grid>
                            <Grid item>
                                {codebaseMapping?.[lang]?.buildTools?.[buildTool]?.name ||
                                    buildTool}
                            </Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByName(a.spec.buildTool, b.spec.buildTool),
            },
            {
                label: 'CI Tool',
                getter: ({ spec: { ciTool } }) => {
                    return (
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                <UseSpriteSymbol
                                    name={
                                        CI_TOOL_ICON_MAPPING?.[ciTool?.toLowerCase()] ||
                                        RESOURCE_ICON_NAMES.OTHER
                                    }
                                    width={20}
                                    height={20}
                                />
                            </Grid>
                            <Grid item>{capitalizeFirstLetter(ciTool)}</Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByName(a.spec.ciTool, b.spec.ciTool),
            },
            {
                label: '',
                getter: ({ jsonData }) => {
                    const buttonRef = React.createRef<HTMLButtonElement>();

                    return (
                        <IconButton
                            ref={buttonRef}
                            aria-label={'Options'}
                            onClick={() =>
                                handleOpenResourceActionListMenu(buttonRef.current, jsonData)
                            }
                        >
                            <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
                        </IconButton>
                    );
                },
            },
        ],
        [handleOpenResourceActionListMenu]
    );
};
