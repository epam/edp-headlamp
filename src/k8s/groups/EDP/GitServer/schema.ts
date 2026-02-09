import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

export const gitServerSpecSchema = z
  .object({
    gitHost: z.string().describe('GitHost specifies the host of the git server.'),
    gitProvider: z
      .enum(['gerrit', 'gitlab', 'github', 'bitbucket'])
      .default('github')
      .describe('Git provider type. Possible values: gerrit, gitlab, github, bitbucket.'),
    gitUser: z
      .string()
      .default('git')
      .describe("GitUser is the username for the git server (default: 'git')."),
    httpsPort: z.number().int().describe('HTTPS port for the git server.'),
    nameSshKeySecret: z.string().describe('Name of the secret containing the SSH key.'),
    skipWebhookSSLVerification: z
      .boolean()
      .optional()
      .describe('Flag to skip webhook TLS verification.'),
    sshPort: z.number().int().describe('SSH port for the git server.'),
    webhookUrl: z
      .string()
      .url()
      .optional()
      .describe(
        'Webhook URL for the git provider. If not set, a new EventListener and Ingress will be created and used for webhooks.'
      ),
  })
  .describe('GitServerSpec defines the desired state of GitServer.');

export const gitServerStatusSchema = z
  .object({
    connected: z
      .boolean()
      .optional()
      .describe('Indicates if the operator is connected to the git server.'),
    error: z.string().optional().describe('Error message if something went wrong.'),
    status: z
      .string()
      .optional()
      .describe("Current status of the GitServer (e.g., 'ok', 'failed')."),
  })
  .describe('GitServerStatus defines the observed state of GitServer.');

export const gitServerSchema = KubeObjectBaseSchema.extend({
  spec: gitServerSpecSchema,
  status: gitServerStatusSchema.optional(),
});

export type GitServer = z.infer<typeof gitServerSchema>;
