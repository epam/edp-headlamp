import { useCDPipelineByAutotestBranchItUsesInItsStagesQuery } from '../../../../../k8s/EDPCDPipeline/hooks/useCDPipelineByAutotestBranchItUsesInItsStagesQuery';
import { useCDPipelineByCodebaseBranchItUsesQuery } from '../../../../../k8s/EDPCDPipeline/hooks/useCDPipelineByCodebaseBranchItUsesQuery';
import { useCDPipelineByGroovyLibraryItUsesInItsStagesQuery } from '../../../../../k8s/EDPCDPipeline/hooks/useCDPipelineByGroovyLibraryItUsesInItsStagesQuery';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
import { isAutotest } from '../../../../../utils/checks/isAutotest';
import { isGroovyLibrary } from '../../../../../utils/checks/isGroovyLibrary';
import { isLibrary } from '../../../../../utils/checks/isLibrary';

export const useConflictedCDPipeline = (
    codebaseBranch: EDPCodebaseBranchKubeObjectInterface,
    codebase: EDPCodebaseKubeObjectInterface
) => {
    const codebaseBranchSpecName = codebaseBranch?.spec.branchName;
    const codebaseBranchMetadataName = codebaseBranch?.metadata.name;

    const CDPipelineByGroovyLibraryItUsesInItsStagesQuery =
        useCDPipelineByGroovyLibraryItUsesInItsStagesQuery({
            props: {
                codebaseName: codebase.metadata.name,
            },
            options: {
                enabled: !!codebaseBranch && isLibrary(codebase) && isGroovyLibrary(codebase),
            },
        });

    const CDPipelineByAutotestBranchItUsesInItsStagesQuery =
        useCDPipelineByAutotestBranchItUsesInItsStagesQuery({
            props: {
                codebaseBranchName: codebaseBranchSpecName,
            },
            options: {
                enabled: !!codebaseBranch && isAutotest(codebase),
            },
        });

    const CDPipelineByCodebaseBranchItUsesQuery = useCDPipelineByCodebaseBranchItUsesQuery({
        props: {
            codebaseBranchName: codebaseBranchMetadataName,
        },
        options: {
            enabled:
                !!codebaseBranch &&
                !isLibrary(codebase) &&
                isGroovyLibrary(codebase) &&
                !isAutotest(codebase),
        },
    });

    if (CDPipelineByGroovyLibraryItUsesInItsStagesQuery.data) {
        return CDPipelineByGroovyLibraryItUsesInItsStagesQuery.data;
    }

    if (CDPipelineByAutotestBranchItUsesInItsStagesQuery.data) {
        return CDPipelineByAutotestBranchItUsesInItsStagesQuery.data;
    }

    if (CDPipelineByCodebaseBranchItUsesQuery.data) {
        return CDPipelineByCodebaseBranchItUsesQuery.data;
    }
};
