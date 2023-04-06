import { getTriggerTemplates } from '../../k8s/TriggerTemplate';
import { TriggerTemplateKubeObjectInterface } from '../../k8s/TriggerTemplate/types';
import { React } from '../../plugin.globals';

interface UseTriggerTemplatesProps {
    namespace: string;
}

export const useTriggerTemplates = ({
    namespace,
}: UseTriggerTemplatesProps): {
    triggerTemplates: TriggerTemplateKubeObjectInterface[];
    error: Error;
} => {
    const [triggerTemplates, setTriggerTemplates] =
        React.useState<TriggerTemplateKubeObjectInterface[]>(null);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getTriggerTemplates(namespace);
                setTriggerTemplates(items);
                setError(null);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [namespace]);

    return { triggerTemplates, error };
};
