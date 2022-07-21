import LeakyBucket from 'leaky-bucket';
import { useInterval } from 'react-use';
import { ApplicationExample } from '../../configs/kube-examples/edp-application';
import { REFETCH_DELAY } from '../../constants/delays';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React } from '../../plugin.globals';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPApplicationListProps } from './types';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

export const EDPApplicationList: React.FC<EDPApplicationListProps> = (): React.ReactElement => {
    const [applications, setApplications] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);

    const reqErrorCost = 1;
    const reqErrorsBucket = new LeakyBucket({
        capacity: 10,
    });
    const updateApplications = React.useCallback(async () => {
        try {
            const { items } = await EDPCodebaseKubeObject.getCodebasesByTypeLabel(
                EDPCodebaseKubeObjectConfig.types.application.name.singularForm
            );

            setApplications(items);
        } catch (err: any) {
            reqErrorsBucket.pay(reqErrorCost);
            const { message } = err;
            const { status } = JSON.parse(JSON.stringify(err));
            throw new Error(`${message}. Status: ${status}`);
        }
    }, [EDPCodebaseKubeObject, setApplications]);

    React.useEffect(() => {
        updateApplications().catch(console.error);
    }, []);

    useInterval(updateApplications, REFETCH_DELAY);

    return (
        <SectionBox title={<SectionFilterHeader title="Applications" headerStyle="main" />}>
            <FloatingActions
                kubeObject={EDPCodebaseKubeObject}
                kubeObjectExample={ApplicationExample}
            />
            <Table data={applications} />
        </SectionBox>
    );
};
