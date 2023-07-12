import { Grid } from '@material-ui/core';
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
import { sortByActiveStatus } from '../../../../../../../utils/sort/sortByActiveStatus';
import { sortByName } from '../../../../../../../utils/sort/sortByName';
export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPTemplateKubeObjectInterface>[] => {
    return React.useMemo(
        () => [
            {
                label: 'Name',
                getter: ({ spec: { displayName } }) => displayName,
                sort: (a, b) => sortByActiveStatus(a.label, b.label),
            },
            {
                label: 'Type',
                getter: ({ spec: { type } }) => type,
                sort: (a, b) => sortByActiveStatus(a.label, b.label),
            },
            {
                label: 'Category',
                getter: ({ spec: { category } }) => category,
                sort: (a, b) => sortByActiveStatus(a.label, b.label),
            },
            {
                label: 'Language',
                getter: ({ spec: { language, type } }) => {
                    const codebaseMapping = getCodebaseMappingByCodebaseType(type);
                    if (!codebaseMapping) {
                        return language;
                    }

                    return (
                        <Grid container spacing={1} alignItems={'center'}>
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
                        <Grid container spacing={1} alignItems={'center'}>
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
                        <Grid container spacing={1} alignItems={'center'}>
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
                sort: (a, b) => sortByActiveStatus(a.label, b.label),
            },
        ],
        []
    );
};
