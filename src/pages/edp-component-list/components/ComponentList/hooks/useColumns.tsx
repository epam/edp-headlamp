import { CodebaseActions } from '../../../../../components/CodebaseActions';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { Render } from '../../../../../components/Render';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { APPLICATION_MAPPING } from '../../../../../configs/codebase-mappings/application';
import { AUTOTEST_MAPPING } from '../../../../../configs/codebase-mappings/autotest';
import { LIBRARY_MAPPING } from '../../../../../configs/codebase-mappings/library';
import { CodebaseInterface } from '../../../../../configs/codebase-mappings/types';
import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { UseSpriteSymbol } from '../../../../../icons/UseSpriteSymbol';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { MuiCore, pluginLib, React } from '../../../../../plugin.globals';
import { COMPONENTS_ROUTE_NAME } from '../../../../../routes/names';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { createRouteNameBasedOnNameAndNamespace } from '../../../../../utils/routes/createRouteName';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { sortByStatus } from '../../../../../utils/sort/sortByStatus';
import { rem } from '../../../../../utils/styling/rem';

const {
    CommonComponents: { Link },
} = pluginLib;
const { Typography } = MuiCore;

const { Grid } = MuiCore;

const getMappingByCodebaseType = (type: string): { [key: string]: CodebaseInterface } | null => {
    return type === CODEBASE_TYPES['APPLICATION']
        ? APPLICATION_MAPPING
        : type === CODEBASE_TYPES['LIBRARY']
        ? LIBRARY_MAPPING
        : type === CODEBASE_TYPES['AUTOTEST']
        ? AUTOTEST_MAPPING
        : null;
};

const otherIconName = 'otherapps';

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPCodebaseKubeObjectInterface>[] =>
    React.useMemo(
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
                            routeName={createRouteNameBasedOnNameAndNamespace(
                                COMPONENTS_ROUTE_NAME
                            )}
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
                    const codebaseMapping = getMappingByCodebaseType(type);
                    if (!codebaseMapping) {
                        return lang;
                    }

                    return (
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                <UseSpriteSymbol
                                    name={codebaseMapping?.[lang]?.language?.icon || otherIconName}
                                    width={20}
                                    height={20}
                                />
                            </Grid>
                            <Grid item>{lang}</Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByName(a.spec.lang, b.spec.lang),
            },
            {
                label: 'Framework',
                getter: ({ spec: { lang, framework, type } }) => {
                    const codebaseMapping = getMappingByCodebaseType(type);

                    if (!codebaseMapping) {
                        return framework;
                    }

                    return (
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                <UseSpriteSymbol
                                    name={
                                        codebaseMapping?.[lang]?.frameworks?.[framework]?.icon ||
                                        otherIconName
                                    }
                                    width={20}
                                    height={20}
                                />
                            </Grid>
                            <Grid item>{framework}</Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByName(a.spec.framework, b.spec.framework),
            },
            {
                label: 'Build Tool',
                getter: ({ spec: { lang, buildTool, type } }) => {
                    const codebaseMapping = getMappingByCodebaseType(type);

                    if (!codebaseMapping) {
                        return buildTool;
                    }

                    return (
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                <UseSpriteSymbol
                                    name={
                                        codebaseMapping?.[lang]?.buildTools?.[buildTool]?.icon ||
                                        otherIconName
                                    }
                                    width={20}
                                    height={20}
                                />
                            </Grid>
                            <Grid item>{buildTool}</Grid>
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
                                <UseSpriteSymbol name={ciTool} width={20} height={20} />
                            </Grid>
                            <Grid item>{ciTool}</Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByName(a.spec.ciTool, b.spec.ciTool),
            },
            {
                label: '',
                getter: kubeObjectData => <CodebaseActions kubeObjectData={kubeObjectData} />,
            },
        ],
        []
    );
