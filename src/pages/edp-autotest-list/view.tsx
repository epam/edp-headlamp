import LeakyBucket from 'leaky-bucket';
import { useInterval } from 'react-use';
import { AutotestExample } from '../../configs/kube-examples/edp-autotest';
import { REFETCH_DELAY } from '../../constants/delays';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPAutotestListProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;

const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPAutotestList: React.FC<EDPAutotestListProps> = (): React.ReactElement => {
    const [autotests, setAutotests] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);
    const reqErrorCost = 1;
    const reqErrorsBucket = new LeakyBucket({
        capacity: 10,
    });

    const updateAutotests = React.useCallback(async () => {
        try {
            const { items } = await EDPCodebaseKubeObject.getCodebasesByTypeLabel(
                EDPCodebaseKubeObjectConfig.types.autotest.name.pluralForm
            );

            setAutotests(items);
            //@ts-ignore
        } catch (err: Error) {
            reqErrorsBucket.pay(reqErrorCost);
            const { message } = err;
            const { status } = JSON.parse(JSON.stringify(err));
            throw new Error(`${message}. Status: ${status}`);
        }
    }, [EDPCodebaseKubeObject, setAutotests]);

    React.useEffect(() => {
        updateAutotests().catch(console.error);
    }, []);

    useInterval(updateAutotests, REFETCH_DELAY);

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
