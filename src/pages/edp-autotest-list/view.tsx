import { FloatingActions } from '../../components/FloatingActions';
import { AutotestExample } from '../../configs/kube-examples/edp-autotest';
import { EDPCodebaseKubeObject, streamCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React, ReactRouter } from '../../plugin.globals';
import { Table } from './components/Table';
import { EDPAutotestListProps } from './types';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;
const { useParams } = ReactRouter;

export const EDPAutotestList: React.FC<EDPAutotestListProps> = (): React.ReactElement => {
    const { namespace } = useParams();
    const [autotests, setAutotests] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);
    const [, setError] = React.useState<string>('');

    React.useEffect(() => {
        const cancelStream = streamCodebasesByTypeLabel(
            EDPCodebaseKubeObjectConfig.types.autotest.name.pluralForm,
            setAutotests,
            setError,
            namespace
        );

        return () => cancelStream();
    }, [namespace]);

    return (
        <SectionBox title={<SectionFilterHeader title="Autotests" headerStyle="main" />}>
            <FloatingActions
                kubeObject={EDPCodebaseKubeObject}
                kubeObjectExample={AutotestExample}
            />
            <Table data={autotests} />
        </SectionBox>
    );
};
