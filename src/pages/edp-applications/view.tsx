import { ApplicationExample } from '../../configs/edp-application';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPCodebasesProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = window;
const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPApplications: React.FC<EDPCodebasesProps> = (): React.ReactElement => {
    const [codebases] = EDPCodebaseKubeObject.useList();
    return (
        <SectionBox title={<SectionFilterHeader title="Applications" headerStyle="main" />}>
            <FloatingActions
                kubeObject={EDPCodebaseKubeObject}
                kubeObjectExample={ApplicationExample}
            />
            <Table data={codebases} />
        </SectionBox>
    );
};
