import { defaultNamespace } from '../../constants/defaultNamespace';

export const useNamespace = () => {
    const namespace = localStorage.getItem('accessible_namespace') || defaultNamespace;
    return { namespace };
};
