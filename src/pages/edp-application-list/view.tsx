import { ApplicationList } from '../../components/ApplicationList';
import { CreateCodebase } from '../../components/CreateCodebase';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { streamCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React, ReactRouter } from '../../plugin.globals';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

const { useParams } = ReactRouter;

export const EDPApplicationList = (): React.ReactElement => {
    const { namespace } = useParams();
    const [applications, setApplications] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);
    const [, setError] = React.useState<Error>(null);

    const handleStoreApplications = React.useCallback(
        (applications: EDPCodebaseKubeObjectInterface[]) => {
            setApplications(applications);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCodebasesByTypeLabel(
            EDPCodebaseKubeObjectConfig.types.application.name.singularForm,
            handleStoreApplications,
            handleError,
            namespace
        );

        return () => cancelStream();
    }, [handleError, handleStoreApplications, namespace]);

    return (
        <SectionBox title={<SectionFilterHeader title="Applications" headerStyle="label" />}>
            <CreateKubeObject>
                <CreateCodebase type={CODEBASE_TYPES['APPLICATION']} />
            </CreateKubeObject>
            <ApplicationList applications={applications} />
        </SectionBox>
    );
};
