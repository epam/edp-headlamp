import { useNamespace } from '../../hooks/useNamespace';
import { streamEDPComponents } from '../../k8s/EDPComponent';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { pluginLib, React } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';
import { Table } from './components/Table';

const { CommonComponents } = pluginLib;
const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPOverviewList = (): React.ReactElement => {
    const { namespace } = useNamespace();

    const [EDPComponents, setEDPComponents] = React.useState<EDPComponentKubeObjectInterface[]>([]);
    const [, setError] = React.useState<Error>(null);

    const handleStoreEDPComponents = React.useCallback(
        (EDPComponents: EDPComponentKubeObjectInterface[]) => {
            const filteredEDPComponents = EDPComponents.filter(el => el.spec.visible);
            setEDPComponents(filteredEDPComponents);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamEDPComponents(handleStoreEDPComponents, handleError, namespace);

        return () => cancelStream();
    }, [handleError, handleStoreEDPComponents, namespace]);

    return (
        <SectionBox
            title={<SectionFilterHeader title="Overview" headerStyle="label" noNamespaceFilter />}
            sx={{ paddingTop: rem(20) }}
        >
            <Table data={EDPComponents} />
        </SectionBox>
    );
};
