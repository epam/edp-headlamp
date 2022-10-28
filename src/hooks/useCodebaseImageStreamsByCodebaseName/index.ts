import { getCodebaseImageStreams } from '../../k8s/EDPCodebaseImageStream';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../k8s/EDPCodebaseImageStream/types';
import { React } from '../../plugin.globals';

export const useCodebaseImageStreamsByCodebaseName = ({
    namespace,
    codebaseName,
}): { codebaseImageStreams: EDPCodebaseImageStreamKubeObjectInterface[]; error: Error } => {
    const [codebaseImageStreams, setCodebaseImageStreams] = React.useState<
        EDPCodebaseImageStreamKubeObjectInterface[]
    >([]);
    const [error, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        (async () => {
            if (!namespace) {
                return;
            }

            try {
                const { items } = await getCodebaseImageStreams(namespace);
                const fitByCodebaseNameItems = items.filter(
                    ({ spec: { codebase } }) => codebase === codebaseName
                );

                setCodebaseImageStreams(fitByCodebaseNameItems);
                setError(null);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [codebaseName, namespace]);

    return { codebaseImageStreams, error };
};
