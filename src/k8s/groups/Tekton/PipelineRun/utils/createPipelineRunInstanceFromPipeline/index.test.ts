import { createRandomString } from '../../../../../../utils/createRandomString';
import { PipelineKubeObjectInterface } from '../../../Pipeline/types';
import { TriggerTemplateKubeObjectInterface } from '../../../TriggerTemplate/types';
import { createPipelineRunInstanceFromPipeline } from './index';

jest.mock('../../../../../../utils/createRandomString', () => ({
  createRandomString: jest.fn(),
}));

describe('testing createPipelineRunInstanceFromPipeline', () => {
  const MOCKED_RANDOM_STRING = 'rand123';

  beforeAll(() => {
    (createRandomString as jest.Mock).mockReturnValue(MOCKED_RANDOM_STRING);
  });

  it('should return a valid pipeline run object when triggerTemplate is undefined', () => {
    const pipeline = {
      metadata: {
        name: 'example-pipeline',
        namespace: 'example-namespace',
      },
      spec: {
        params: [
          { name: 'param1', default: 'value1' },
          { name: 'param2', default: 'value2' },
          { name: 'param3', default: '' },
        ],
      },
    };

    const result = createPipelineRunInstanceFromPipeline(
      undefined,
      pipeline as unknown as PipelineKubeObjectInterface
    );

    expect(result).toEqual({
      apiVersion: 'tekton.dev/v1',
      kind: 'PipelineRun',
      metadata: {
        name: 'run-example-pipeline-rand123',
        namespace: 'example-namespace',
      },
      spec: {
        pipelineRef: {
          name: 'example-pipeline',
        },
        params: [
          { name: 'param1', value: 'value1' },
          { name: 'param2', value: 'value2' },
          { name: 'param3', value: '' },
        ],
      },
    });
    expect(createRandomString).toHaveBeenCalledTimes(1);
  });

  it('should return a pipeline run object from triggerTemplate when triggerTemplate is defined', () => {
    const triggerTemplate = {
      spec: {
        resourcetemplates: [
          {
            metadata: {},
            spec: {
              pipelineRef: {
                name: 'old-pipeline-name',
              },
            },
          },
        ],
      },
    };
    const pipeline = {
      metadata: {
        name: 'new-pipeline-name',
      },
    };

    const result = createPipelineRunInstanceFromPipeline(
      triggerTemplate as unknown as TriggerTemplateKubeObjectInterface,
      pipeline as unknown as PipelineKubeObjectInterface
    );

    expect(result).toEqual({
      metadata: {},
      spec: {
        pipelineRef: {
          name: 'new-pipeline-name',
        },
      },
    });
  });
});
