import { CodebaseActions } from '../../../../components/CodebaseActions';
import { React } from '../../../../plugin.globals';
import { PageHeaderActionsProps } from './types';

export const PageHeaderActions: React.FC<PageHeaderActionsProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    return <CodebaseActions kubeObject={kubeObject} kubeObjectData={kubeObjectData} />;
};
