import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

export const codebaseSpecSchema = z
  .object({
    branchToCopyInDefaultBranch: z
      .string()
      .optional()
      .describe(
        'While we clone new codebase we can select specific branch to clone. Selected branch will become a default branch for a new codebase (e.g. master, main).'
      ),
    buildTool: z.string().describe('A build tool which is used on codebase.'),
    ciTool: z.string().default('tekton').describe('A name of tool which should be used as CI.'),
    commitMessagePattern: z.string().nullable().optional(),
    defaultBranch: z.string().describe('Name of default branch.'),
    deploymentScript: z.string().default('helm-chart'),
    description: z.string().nullable().optional().describe('A short description of codebase.'),
    disablePutDeployTemplates: z
      .boolean()
      .optional()
      .describe('Controller must skip step "put deploy templates" in action chain.'),
    emptyProject: z
      .boolean()
      .describe('A flag indicating how project should be provisioned. Default: false'),
    framework: z.string().describe('A framework used in codebase.'),
    gitServer: z
      .string()
      .describe('A name of git server which will be used as VCS. Example: "gerrit".'),
    gitUrlPath: z
      .string()
      .describe(
        'A relative path for git repository. Should start from /. Example: /company/api-app.'
      ),
    jiraIssueMetadataPayload: z.string().nullable().optional(),
    jiraServer: z.string().nullable().optional(),
    lang: z.string().describe('Programming language used in codebase.'),
    private: z
      .boolean()
      .default(true)
      .describe('Private indicates if we need to create private repository.'),
    repository: z
      .object({
        url: z.string().nullable().optional(),
      })
      .required({ url: true }),
    strategy: z
      .enum(['create', 'clone', 'import'])
      .describe('integration strategy for a codebase, e.g. clone, import, etc.'),
    testReportFramework: z.string().nullable().optional(),
    ticketNamePattern: z.string().nullable().optional(),
    type: z.string().describe('Type of codebase. E.g. application, autotest or library.'),
    versioning: z
      .object({
        startFrom: z
          .string()
          .nullable()
          .optional()
          .describe('StartFrom is required when versioning type is not default.'),
        type: z.string(),
      })
      .required({ type: true }),
  })
  .required({
    buildTool: true,
    defaultBranch: true,
    emptyProject: true,
    framework: true,
    gitServer: true,
    gitUrlPath: true,
    lang: true,
    strategy: true,
    type: true,
    versioning: true,
  });

export type CodebaseSpec = z.infer<typeof codebaseSpecSchema>;

export const codebaseStatusSchema = z
  .object({
    action: z.string().describe('The last Action was performed.'),
    available: z
      .boolean()
      .describe(
        'This flag indicates neither Codebase are initialized and ready to work. Defaults to false.'
      ),
    detailedMessage: z
      .string()
      .optional()
      .describe('Detailed information regarding action result which were performed'),
    failureCount: z
      .number()
      .int()
      .describe('Amount of times, operator fail to serve with existing CR.'),
    git: z.string().describe('Specifies a status of action for git.'),
    gitWebUrl: z.string().optional().describe('Stores GitWebUrl of codebase.'),
    lastTimeUpdated: z
      .string()
      .datetime()
      .describe('Information when the last time the action were performed.'),
    result: z
      .enum(['success', 'error'])
      .describe(
        'A result of an action which were performed. - "success": action where performed successfully; - "error": error has occurred;'
      ),
    status: z.string().describe('Specifies a current status of Codebase.'),
    username: z.string().describe('Name of user who made a last change.'),
    value: z.string().describe('Specifies a current state of Codebase.'),
    webHookID: z
      .number()
      .int()
      .optional()
      .describe(
        'Stores ID of webhook which was created for a codebase. Deprecated: Because the webhook id can be more than just an integer. Use WebHookRef instead.'
      ),
    webHookRef: z
      .string()
      .optional()
      .describe('WebHookRef stores unique reference to webhook which was created for a codebase.'),
  })
  .required({
    action: true,
    available: true,
    failureCount: true,
    git: true,
    lastTimeUpdated: true,
    result: true,
    status: true,
    username: true,
    value: true,
  });

export type CodebaseStatus = z.infer<typeof codebaseStatusSchema>;

export const codebaseSchema = KubeObjectBaseSchema.extend({
  spec: codebaseSpecSchema,
  status: codebaseStatusSchema.optional(),
}).required();

export type Codebase = z.infer<typeof codebaseSchema>;
