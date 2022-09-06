import { CDPIPELINE_CREATION_FORM_NAMES } from '../../../../components/CreateCDPipeline/components/CreateCDPipelineForm/names';
import { createCDPipelineInstance } from './index';

describe('testing createCDPipelineInstance', () => {
    it('should return valid kube object', () => {
        const object = createCDPipelineInstance(CDPIPELINE_CREATION_FORM_NAMES, {
            deploymentType: 'container',
            namespace: 'edp-delivery-vp-delivery-dev',
            name: 'test-pipe',
            applications: ['test-app-2', 'test-application'],
            inputDockerStreams: ['test-app-2-master', 'test-application-develop'],
            applicationsToPromote: ['test-app-2', 'test-application'],
        });
        expect(object).toEqual({
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CDPipeline',
            metadata: { name: 'test-pipe', namespace: 'edp-delivery-vp-delivery-dev' },
            spec: {
                name: 'test-pipe',
                deploymentType: 'container',
                applications: ['test-app-2', 'test-application'],
                inputDockerStreams: ['test-app-2-master', 'test-application-develop'],
                applicationsToPromote: ['test-app-2', 'test-application'],
            },
        });
    });
});
