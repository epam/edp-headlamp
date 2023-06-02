import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { MappedProperties } from '../../../../../components/MappedProperties';
import { Render } from '../../../../../components/Render';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { ICONS } from '../../../../../constants/icons';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { Iconify, MuiCore, pluginLib, React } from '../../../../../plugin.globals';
import { useResourceActionListContext } from '../../../../../providers/ResourceActionList/hooks';
import { CDPIPELINES_ROUTE_NAME } from '../../../../../routes/names';
import { HeadlampKubeObject } from '../../../../../types/k8s';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { createRouteNameBasedOnNameAndNamespace } from '../../../../../utils/routes/createRouteName';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { sortByStatus } from '../../../../../utils/sort/sortByStatus';
import { rem } from '../../../../../utils/styling/rem';

const {
    CommonComponents: { Link },
} = pluginLib;
const { IconButton, Typography } = MuiCore;
const { Icon } = Iconify;
export const useColumns = (): HeadlampSimpleTableGetterColumn<
    HeadlampKubeObject<EDPCDPipelineKubeObjectInterface>
>[] => {
    const { handleOpenResourceActionListMenu } = useResourceActionListContext();

    return React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status: CDPipelineStatus }) => {
                    const status = CDPipelineStatus
                        ? CDPipelineStatus.status
                        : CUSTOM_RESOURCE_STATUSES['UNKNOWN'];

                    const title = (
                        <>
                            <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                {capitalizeFirstLetter(status)}
                            </Typography>
                            <Render condition={status === CUSTOM_RESOURCE_STATUSES['FAILED']}>
                                <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                                    {CDPipelineStatus?.detailed_message}
                                </Typography>
                            </Render>
                        </>
                    );

                    return <StatusIcon status={status} customTitle={title} />;
                },
                sort: (a, b) => sortByStatus(a.status.status, b.status.status),
            },
            {
                label: 'CD Pipeline',
                getter: ({ metadata: { name, namespace } }) => {
                    return (
                        <Link
                            routeName={createRouteNameBasedOnNameAndNamespace(
                                CDPIPELINES_ROUTE_NAME
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
                label: 'Applications',
                getter: ({ spec: { applications } }) => (
                    <MappedProperties properties={applications} variant={'block'} />
                ),
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
