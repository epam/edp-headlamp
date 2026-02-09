import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

const SecretRefSchema = z
  .object({
    name: z.string().describe('Name of the secret.'),
    secretKey: z.string().describe('Key of the secret to select from.'),
  })
  .describe('SecretRef is the reference for a secret containing the value.');

const SourceRefSchema = z
  .object({
    secretRef: SecretRefSchema,
  })
  .describe('SourceRef is the reference to the actual secret value.');

const KeyValueSchema = z
  .object({
    key: z.string().describe('Key of the pair.'),
    value: z.string().optional().describe('Value of the pair.'),
    sourceRef: SourceRefSchema.optional().describe('Reference to the value, such as a secret.'),
  })
  .describe('KeyValue defines a key-value pair.');

const CredentialValuesSchema = z.array(KeyValueSchema).nullable().optional();

const GitCredentialSchema = z
  .object({
    secretRef: SecretRefSchema,
    tokenName: z.string().describe("Name of the token (e.g., 'admin-token')."),
    url: z.string().url().describe('URL of the Git repository.'),
  })
  .describe('GitCredential configuration for the Git repository.');

const CodemieRefSchema = z
  .object({
    kind: z.string().default('Codemie').optional().describe('Kind of the Codemie resource.'),
    name: z.string().describe('Name of the Codemie resource.'),
  })
  .describe('CodemieRef is a reference to a Codemie resource.');

const codemieProjectSettingsSpecSchema = z
  .object({
    alias: z.string().describe('Unique alias for the project settings.'),
    codemieRef: CodemieRefSchema,
    credentialValues: CredentialValuesSchema.describe(
      'List of key-value pairs used for credentials.'
    ),
    gitCredential: GitCredentialSchema.optional().describe('Git credential configuration.'),
    projectName: z
      .string()
      .describe('Name of the project.')
      .refine((name) => !!name, {
        message: 'Value is immutable',
      }),
    type: z
      .string()
      .describe('Type of the credential (e.g., Git).')
      .refine((type) => !!type, {
        message: 'Value is immutable',
      }),
  })
  .describe('CodemieProjectSettingsSpec defines the desired state of CodemieProjectSettings.');

const codemieProjectSettingsStatusSchema = z
  .object({
    error: z.string().optional().describe('Error message if something went wrong.'),
    id: z.string().optional().describe('ID of the project setting.'),
    value: z.string().optional().describe('Status of the project setting.'),
  })
  .describe('CodemieProjectSettingsStatus defines the observed state of CodemieProjectSettings.');

export const codemieProjectSettingsSchema = KubeObjectBaseSchema.extend({
  spec: codemieProjectSettingsSpecSchema,
  status: codemieProjectSettingsStatusSchema.optional(),
}).required();
export type CodemieProjectSettings = z.infer<typeof codemieProjectSettingsSchema>;
