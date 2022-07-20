import { CDPipelineActions } from '../../../../components/CDPipelineActions';
import { React } from '../../../../plugin.globals';
import { PageHeaderActionsProps } from './types';

export const PageHeaderActions: React.FC<PageHeaderActionsProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    return <CDPipelineActions kubeObject={kubeObject} kubeObjectData={kubeObjectData} />;
};
