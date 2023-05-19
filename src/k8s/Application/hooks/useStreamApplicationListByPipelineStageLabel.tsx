import { React } from '../../../plugin.globals';
import { ApplicationKubeObject } from '../index';
import { ApplicationKubeObjectInterface } from '../types';

interface UseStreamApplicationListByPipelineStageLabelProps {
    namespace: string;
    stageSpecName: string;
    CDPipelineMetadataName: string;
    select?: (data: ApplicationKubeObjectInterface[]) => ApplicationKubeObjectInterface[];
}

export const useStreamApplicationListByPipelineStageLabel = ({
    namespace,
    stageSpecName,
    CDPipelineMetadataName,
    select,
}: UseStreamApplicationListByPipelineStageLabelProps) => {
    const [applicationList, setApplicationList] = React.useState<ApplicationKubeObjectInterface[]>(
        []
    );

    React.useEffect(() => {
        const cancelStream = ApplicationKubeObject.streamApplicationListByPipelineStageLabel({
            namespace,
            stageSpecName,
            CDPipelineMetadataName,
            dataHandler: data => {
                const selectedData = select ? select(data) : data;
                setApplicationList(selectedData);
            },
            errorHandler: error => console.error(error),
        });

        return () => {
            cancelStream();
        };
    }, [CDPipelineMetadataName, namespace, select, stageSpecName]);

    return applicationList;
};
