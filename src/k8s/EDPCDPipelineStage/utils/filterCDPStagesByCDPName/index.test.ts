import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { EDPCDPipelineStageKubeObjectConfig } from '../../config';
import { EDPCDPipelineStageKubeObjectInterface } from '../../types';
import { filterCDPStagesByCDPName } from './index';
import stages from './mocks/stages.json';

const stageKind = capitalizeFirstLetter(EDPCDPipelineStageKubeObjectConfig.name.singularForm);
const stageCDPipelineName = 'deploy-pipe-1';

describe('checking filterCDPStagesByCDPName', () => {
    test(`testing cdpipeline name - ${stageCDPipelineName}`, () => {
        const [firstFilteredStage] = filterCDPStagesByCDPName(
            stages as EDPCDPipelineStageKubeObjectInterface[],
            stageCDPipelineName
        );
        expect(firstFilteredStage.kind).toMatch(stageKind);
        expect(firstFilteredStage.spec.cdPipeline).toMatch(stageCDPipelineName);
    });
});
