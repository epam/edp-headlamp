import { Grid, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { HeadlampSimpleTableGetterColumn } from '../../../../../../../components/HeadlampSimpleTable/types';
import {
    BUILD_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../../../../../../configs/icon-mappings';
import { RESOURCE_ICON_NAMES } from '../../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../../icons/UseSpriteSymbol';
import { EDPTemplateKubeObjectInterface } from '../../../../../../../k8s/EDPTemplate/types';
import { getCodebaseMappingByCodebaseType } from '../../../../../../../utils/getCodebaseMappingByCodebaseType';
import { sortByName } from '../../../../../../../utils/sort/sortByName';
import { rem } from '../../../../../../../utils/styling/rem';
export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPTemplateKubeObjectInterface>[] => {
    return React.useMemo(
        () => [
            {
                label: '',
                getter: ({ spec: { icon } }) => {
                    return (
                        <img
                            style={{ height: rem(40), verticalAlign: 'middle' }}
                            src={`data:${icon[0].mediatype};base64,${icon[0].base64data}`}
                            alt=""
                        />
                    );
                },
            },
            {
                label: 'Name',
                getter: ({ spec: { description, displayName } }) => (
                    <Tooltip title={description}>
                        <Typography>{displayName}</Typography>
                    </Tooltip>
                ),
                sort: (a, b) => sortByName(a.spec.displayName, b.spec.displayName),
            },
            {
                label: 'Type',
                getter: ({ spec: { type } }) => type,
                sort: (a, b) => sortByName(a.spec.type, b.spec.type),
            },
            {
                label: 'Category',
                getter: ({ spec: { category } }) => category,
                sort: (a, b) => sortByName(a.spec.category, b.spec.category),
            },
            {
                label: 'Language',
                getter: ({ spec: { language, type } }) => {
                    const codebaseMapping = getCodebaseMappingByCodebaseType(type);
                    if (!codebaseMapping) {
                        return language;
                    }

                    return (
                        <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                            <Grid item>
                                <UseSpriteSymbol
                                    name={
                                        LANGUAGE_ICON_MAPPING?.[language?.toLowerCase()] ||
                                        RESOURCE_ICON_NAMES.OTHER
                                    }
                                    width={20}
                                    height={20}
                                />
                            </Grid>
                            <Grid item>
                                {codebaseMapping?.[language]?.language?.name || language}
                            </Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByName(a.spec.language, b.spec.language),
            },
            {
                label: 'Framework',
                getter: ({ spec: { language, framework, type } }) => {
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
                                {codebaseMapping?.[language]?.frameworks?.[framework]?.name ||
                                    framework}
                            </Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByName(a.spec.framework, b.spec.framework),
            },
            {
                label: 'Build Tool',
                getter: ({ spec: { language, buildTool, type } }) => {
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
                                {codebaseMapping?.[language]?.buildTools?.[buildTool]?.name ||
                                    buildTool}
                            </Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByName(a.spec.buildTool, b.spec.buildTool),
            },
            {
                label: 'Maturity',
                getter: ({ spec: { maturity } }) => maturity,
                sort: (a, b) => sortByName(a.spec.maturity, b.spec.maturity),
            },
        ],
        []
    );
};
