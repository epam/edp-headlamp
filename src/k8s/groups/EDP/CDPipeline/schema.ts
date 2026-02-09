import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

export const CDPipelineSpecSchema = z
  .object({
    applications: z
      .array(z.string())
      .min(1)
      .describe('A list of applications included in CDPipeline.'),
    applicationsToPromote: z
      .array(z.string())
      .nullable()
      .optional()
      .describe('A list of applications which will promote after a successful release.'),
    deploymentType: z
      .string()
      .default('container')
      .describe('Type of workload to be deployed, e.g., container, custom.'),
    description: z.string().optional().describe('Description of CD pipeline.'),
    inputDockerStreams: z.array(z.string()).min(1).describe('A list of docker streams.'),
    name: z.string().min(2).describe('Name of CD pipeline.'),
  })
  .describe('CDPipelineSpec defines the desired state of CDPipeline.');

export type CDPipelineSpec = z.infer<typeof CDPipelineSpecSchema>;

export const CDPipelineStatusSchema = z
  .object({
    action: z.string().describe('The last action performed.'),
    available: z
      .boolean()
      .default(false)
      .describe(
        'This flag indicates whether the CDPipeline is initialized and ready to work. Defaults to false.'
      ),
    detailed_message: z
      .string()
      .optional()
      .describe('Detailed information about the action result.'),
    last_time_updated: z
      .string()
      .datetime()
      .describe('Information on when the last action was performed.'),
    result: z
      .enum(['success', 'error'])
      .describe("A result of an action which was performed ('success' or 'error')."),
    status: z.string().describe('Specifies the current status of CDPipeline.'),
    username: z.string().describe('Name of the user who made the last change.'),
    value: z.string().describe('Specifies the current state of CDPipeline.'),
  })
  .describe('CDPipelineStatus defines the observed state of CDPipeline.');

export type CDPipelineStatus = z.infer<typeof CDPipelineStatusSchema>;

export const CDPipelineSchema = KubeObjectBaseSchema.extend({
  spec: CDPipelineSpecSchema,
  status: CDPipelineStatusSchema.optional(),
}).required();

export type CDPipeline = z.infer<typeof CDPipelineSchema>;
