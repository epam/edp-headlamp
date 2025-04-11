import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

export const codebaseBranchSpecSchema = z
  .object({
    branchName: z.string().describe('Name of a branch.'),
    codebaseName: z.string().describe('Name of Codebase associated with.'),
    fromCommit: z
      .string()
      .describe('The new branch will be created starting from the selected commit hash.'),
    pipelines: z
      .record(z.string())
      .nullable()
      .optional()
      .describe('Pipelines is a map of pipelines related to the branch.'),
    release: z.boolean().describe('Flag if branch is used as "release" branch.'),
    version: z.string().nullable().optional(),
  })
  .describe('CodebaseBranchSpec defines the desired state of CodebaseBranch.');

export type CodebaseBranchSpec = z.infer<typeof codebaseBranchSpecSchema>;

export const codebaseBranchStatusSchema = z
  .object({
    action: z.string().describe('The last Action was performed.'),
    build: z.string().nullable().optional(),
    detailedMessage: z
      .string()
      .optional()
      .describe('Detailed information regarding the action result.'),
    failureCount: z
      .number()
      .int()
      .describe('Amount of times the operator failed to serve the existing CR.'),
    git: z.string().optional().describe('Specifies a status of action for git.'),
    lastSuccessfulBuild: z.string().nullable().optional(),
    lastTimeUpdated: z
      .string()
      .datetime()
      .describe('Information when the last time the action was performed.'),
    result: z.enum(['success', 'error']).describe('A result of an action which was performed.'),
    status: z.string().describe('Specifies the current status of the CodebaseBranch.'),
    username: z.string().describe('Name of the user who made the last change.'),
    value: z.string().describe('Specifies the current state of CodebaseBranch.'),
    versionHistory: z.array(z.string()).nullable().optional(),
  })
  .describe('CodebaseBranchStatus defines the observed state of CodebaseBranch.');

export type CodebaseBranchStatus = z.infer<typeof codebaseBranchStatusSchema>;

export const codebaseBranchSchema = KubeObjectBaseSchema.extend({
  spec: codebaseBranchSpecSchema,
  status: codebaseBranchStatusSchema.optional(),
}).required();

export type CodebaseBranch = z.infer<typeof codebaseBranchSchema>;
