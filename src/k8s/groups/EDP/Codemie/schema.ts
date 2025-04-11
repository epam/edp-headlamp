import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

export const codemieSecretRefSchema = z
  .object({
    clientKey: z
      .string()
      .describe("The key of the secret containing the client key (e.g., 'client-key')."),
    name: z.string().describe('The name of the secret.'),
    secretKey: z
      .string()
      .describe("The key of the secret containing the secret key (e.g., 'secret-key')."),
  })
  .describe('SecretRef is a reference to a secret containing the client key and secret.');
export type CodemieSecretRef = z.infer<typeof codemieSecretRefSchema>;

export const codemieOidcSchema = z
  .object({
    secretRef: codemieSecretRefSchema,
    tokenEndpoint: z.string().url().describe('URL of the OIDC token endpoint.'),
  })
  .describe('OIDC is the configuration of the OIDC client.');
export type CodemieOidc = z.infer<typeof codemieOidcSchema>;

export const codemieSpecSchema = z
  .object({
    oidc: codemieOidcSchema,
    url: z.string().url().describe('URL of the Codemie API.'),
  })
  .describe('CodemieSpec defines the desired state of Codemie.');
export type CodemieSpec = z.infer<typeof codemieSpecSchema>;

export const codemieStatusSchema = z
  .object({
    connected: z
      .boolean()
      .optional()
      .describe('Indicates if the operator is connected to Codemie.'),
    error: z.string().optional().describe('Error message if something went wrong.'),
    user: z.string().optional().describe('The user connected to Codemie.'),
  })
  .describe('CodemieStatus defines the observed state of Codemie.');
export type CodemieStatus = z.infer<typeof codemieStatusSchema>;

export const codemieSchema = KubeObjectBaseSchema.extend({
  spec: codemieSpecSchema,
  status: codemieStatusSchema.optional(),
}).required();
export type Codemie = z.infer<typeof codemieSchema>;
