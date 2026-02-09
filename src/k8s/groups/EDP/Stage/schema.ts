import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

const stageQualityGateSchema = z
  .object({
    qualityGateType: z.string().describe('Type of quality gate, e.g. "Manual" or "Autotests"'),
    stepName: z.string().min(2).describe('Specifies the name of the step (minimum length: 2).'),
    autotestName: z
      .string()
      .nullable()
      .optional()
      .describe('Name of autotests to run with the quality gate.'),
    branchName: z
      .string()
      .nullable()
      .optional()
      .describe('Branch name to use from the autotests repository.'),
  })
  .describe('QualityGate defines a single quality for a release.');

export type StageQualityGate = z.infer<typeof stageQualityGateSchema>;

const stageSourceLibrarySchema = z
  .object({
    branch: z.string().optional().describe('Branch to use for the library.'),
    name: z.string().optional().describe('Name of the library.'),
  })
  .nullable()
  .describe('Library reference for non-default pipeline libraries.');

const stageSourceSchema = z
  .object({
    library: stageSourceLibrarySchema.optional(),
    type: z
      .string()
      .default('default')
      .describe('Pipeline library type, e.g., "default" or "library".'),
  })
  .default({ type: 'default' })
  .describe('Source defines the pipeline library used to run the release.');

const stageSpecSchema = z
  .object({
    cdPipeline: z
      .string()
      .min(2)
      .describe('Name of the CD pipeline this Stage is linked to (minimum length: 2).'),
    cleanTemplate: z
      .string()
      .optional()
      .describe('Name of Tekton TriggerTemplate used for cleaning up the environment pipeline.'),
    clusterName: z
      .string()
      .default('in-cluster')
      .describe(
        'Name of the cluster where the application will be deployed. Default is "in-cluster".'
      ),
    description: z.string().min(0).optional().describe('Description of the stage.'),
    name: z.string().min(2).describe('Name of the stage (minimum length: 2).'),
    namespace: z
      .string()
      .refine(() => true, {
        message: 'Value is immutable',
      })
      .describe('Namespace where the application will be deployed.'),
    order: z
      .number()
      .int()
      .describe('Order to lay out Stages. Starts from 0, and subsequent stages use +1.'),
    qualityGates: z
      .array(stageQualityGateSchema)
      .describe('A list of quality gates to be processed.'),
    source: stageSourceSchema
      .optional()
      .describe('Source of pipeline libraries running the release.'),
    triggerTemplate: z
      .string()
      .default('deploy')
      .describe(
        'Name of Tekton TriggerTemplate used for deployment pipelines. Default is "deploy".'
      ),
    triggerType: z
      .enum(['Auto', 'Manual', 'Auto-stable'])
      .default('Manual')
      .describe('Stage deployment trigger type.'),
  })
  .describe('StageSpec defines the desired state of Stage.');

const stageStatusSchema = z
  .object({
    action: z.string().describe('The last action performed.'),
    available: z
      .boolean()
      .default(false)
      .describe('Indicates whether the stage is initialized and ready to work. Defaults to false.'),
    detailed_message: z
      .string()
      .optional()
      .describe('Detailed information about the action result.'),
    last_time_updated: z.string().datetime().describe('Time when the last action was performed.'),
    result: z
      .enum(['success', 'error'])
      .describe('Result of the last action performed. Possible values: "success" or "error".'),
    shouldBeHandled: z
      .boolean()
      .default(false)
      .optional()
      .describe('Indicates whether the status update should be handled. Defaults to false.'),
    status: z.string().describe('Current status of the stage.'),
    username: z.string().describe('Name of the user who made the last change.'),
    value: z.string().describe('Specifies the current state of the stage.'),
  })
  .describe('StageStatus defines the observed state of Stage.');

const stageSchema = KubeObjectBaseSchema.extend({
  spec: stageSpecSchema,
  status: stageStatusSchema.optional(),
});

export type Stage = z.infer<typeof stageSchema>;
