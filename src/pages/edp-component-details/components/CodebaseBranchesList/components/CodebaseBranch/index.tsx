import { Icon } from '@iconify/react';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../../k8s/PipelineRun/types';
import { sortKubeObjectByCreationTimestamp } from '../../../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../../../utils/styling/rem';
import { Details } from './components/Details';
import { Summary } from './components/Summary';
import { CodebaseBranchProps } from './types';

export const CodebaseBranch = ({
    codebaseBranchData,
    expandedPanel,
    id,
    handlePanelChange,
    codebaseData,
}: CodebaseBranchProps) => {
    const [pipelineRuns, setPipelineRuns] = React.useState<{
        all: PipelineRunKubeObjectInterface[];
        latestBuildPipelineRun: PipelineRunKubeObjectInterface;
    }>({
        all: null,
        latestBuildPipelineRun: null,
    });

    const [, setError] = React.useState<Error>(null);

    const handleStorePipelineRuns = React.useCallback(
        (socketPipelineRuns: PipelineRunKubeObjectInterface[]) => {
            const sortedPipelineRuns = socketPipelineRuns.sort(sortKubeObjectByCreationTimestamp);

            if (sortedPipelineRuns.length === 0) {
                setPipelineRuns({
                    all: [],
                    latestBuildPipelineRun: undefined,
                });
                return;
            }

            const [latestBuildPipelineRun] = sortedPipelineRuns;

            if (
                PipelineRunKubeObject.parseStatusReason(latestBuildPipelineRun) ===
                PipelineRunKubeObject.parseStatusReason(pipelineRuns.latestBuildPipelineRun)
            ) {
                return;
            }

            setPipelineRuns({
                all: sortedPipelineRuns,
                latestBuildPipelineRun,
            });
        },
        [pipelineRuns.latestBuildPipelineRun]
    );

    const handleStreamError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    const normalizedCodebaseBranchName = codebaseBranchData.metadata.name.replaceAll('/', '-');

    React.useEffect(() => {
        const cancelStream = PipelineRunKubeObject.streamPipelineRunListByCodebaseBranchLabel({
            namespace: codebaseBranchData.metadata.namespace,
            codebaseBranchLabel: normalizedCodebaseBranchName,
            dataHandler: handleStorePipelineRuns,
            errorHandler: handleStreamError,
        });

        return () => cancelStream();
    }, [
        normalizedCodebaseBranchName,
        handleStreamError,
        handleStorePipelineRuns,
        codebaseBranchData,
    ]);

    return (
        <div style={{ paddingBottom: rem(16) }}>
            <Accordion expanded={expandedPanel === id} onChange={handlePanelChange(id)}>
                <AccordionSummary expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}>
                    <Summary
                        codebaseData={codebaseData}
                        codebaseBranchData={codebaseBranchData}
                        pipelineRuns={pipelineRuns}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    <Details
                        codebaseData={codebaseData}
                        codebaseBranchData={codebaseBranchData}
                        pipelineRuns={pipelineRuns}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
