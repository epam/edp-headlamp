import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

export const codebaseImageStreamTagSchema = z.object({
  created: z.string().describe('Creation date of the tag.'),
  name: z.string().describe('Name of the docker image tag.'),
});

export type CodebaseImageStreamTag = z.infer<typeof codebaseImageStreamTagSchema>;

export const codebaseImageStreamSpecSchema = z
  .object({
    codebase: z.string().describe('Name of Codebase associated with.'),
    imageName: z
      .string()
      .describe('Docker container name without a tag, e.g., registry-name/path/name.'),
    tags: z
      .array(codebaseImageStreamTagSchema)
      .nullable()
      .optional()
      .describe('A list of docker image tags available for ImageName and their creation date.'),
  })
  .describe('CodebaseImageStreamSpec defines the desired state of CodebaseImageStream.');

export type CodebaseImageStreamSpec = z.infer<typeof codebaseImageStreamSpecSchema>;

export const codebaseImageStreamStatusSchema = z
  .object({
    detailed_message: z
      .string()
      .optional()
      .describe('Detailed information regarding action result which were performed.'),
    failureCount: z
      .number()
      .int()
      .describe('Amount of times the operator failed to serve the existing CR.'),
  })
  .describe('CodebaseImageStreamStatus defines the observed state of CodebaseImageStream.');

export type CodebaseImageStreamStatus = z.infer<typeof codebaseImageStreamStatusSchema>;

export const codebaseImageStreamSchema = KubeObjectBaseSchema.extend({
  spec: codebaseImageStreamSpecSchema,
  status: codebaseImageStreamStatusSchema.optional(),
}).required();

export type CodebaseImageStream = z.infer<typeof codebaseImageStreamSchema>;
