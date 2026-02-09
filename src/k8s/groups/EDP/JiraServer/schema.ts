import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

const jiraServerSpecSchema = z
  .object({
    apiUrl: z.string().url().describe('API URL for the JiraServer.'),
    credentialName: z
      .string()
      .describe('The name of the credential used for authenticating with the Jira server.'),
    rootUrl: z.string().url().describe('Root URL of the Jira server.'),
  })
  .describe('JiraServerSpec defines the desired state of JiraServer.');

const jiraServerStatusSchema = z
  .object({
    available: z
      .boolean()
      .describe('Indicates if the JiraServer is initialized and ready to work. Defaults to false.'),
    detailed_message: z
      .string()
      .optional()
      .describe('Detailed information regarding the action result.'),
    last_time_updated: z.string().datetime().describe('Time when the last action was performed.'),
    status: z.string().describe('Current status of the JiraServer.'),
  })
  .describe('JiraServerStatus defines the observed state of JiraServer.');

export const jiraServerSchema = KubeObjectBaseSchema.extend({
  spec: jiraServerSpecSchema,
  status: jiraServerStatusSchema.optional(),
});

export type JiraServer = z.infer<typeof jiraServerSchema>;
