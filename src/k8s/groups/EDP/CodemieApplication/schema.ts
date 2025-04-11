import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

export const codemieApplicationCodeConfigSchema = z
  .object({
    branch: z
      .string()
      .default('main')
      .optional()
      .describe("Branch of the repository (defaults to 'main')."),
    embeddingsModel: z
      .string()
      .describe("Model used for embeddings (e.g., 'codemie-text-embedding-ada-002')."),
    fileRegex: z.string().optional().describe("Regex to filter files to index (e.g., '.*')."),
    fileTypes: z
      .array(z.string())
      .nullable()
      .optional()
      .describe('List of file types/extensions to index.'),
    link: z.string().describe("Link to the repository (e.g., 'https://git-example.com/org/repo')."),
  })
  .describe('ApplicationCodeConfig is a configuration for the application code.');
export type CodemieApplicationCodeConfig = z.infer<typeof codemieApplicationCodeConfigSchema>;

export const codemieApplicationPromptsSchema = z
  .object({
    name: z.string().describe("Name of the prompt (e.g., 'docs' or 'documentation')."),
    template: z
      .string()
      .describe("Instructions to generate docs (e.g., 'Docs are generated using MkDocs')."),
  })
  .describe('Individual prompt for generating docs.');
export type CodemieApplicationPrompts = z.infer<typeof codemieApplicationPromptsSchema>;

export const codemieApplicationSummaryConfigSchema = z
  .object({
    generateDocs: z
      .boolean()
      .default(false)
      .optional()
      .describe(
        'Flag to determine if the application should generate docs and push them to the repository (defaults to false).'
      ),
    prompts: z
      .array(codemieApplicationPromptsSchema)
      .nullable()
      .optional()
      .describe('List of prompts to generate docs.'),
  })
  .describe("ApplicationSummaryConfig is a configuration for the application's IndexType summary.");
export type CodemieApplicationSummaryConfig = z.infer<typeof codemieApplicationSummaryConfigSchema>;

export const codemieRefSchema = z
  .object({
    kind: z
      .string()
      .default('Codemie')
      .optional()
      .describe("Kind of the referenced Codemie resource (defaults to 'Codemie')."),
    name: z.string().describe('Name of the referenced Codemie resource.'),
  })
  .describe('CodemieRef is a reference to a Codemie resource.');
export type CodemieRef = z.infer<typeof codemieRefSchema>;

export const codemieApplicationSpecSchema = z
  .object({
    applicationCodeConfig: codemieApplicationCodeConfigSchema,
    applicationSummaryConfig: codemieApplicationSummaryConfigSchema.optional(),
    codemieRef: codemieRefSchema,
    description: z.string().optional().describe('Description of the application.'),
    indexType: z
      .enum(['code', 'chunk-summary', 'summary'])
      .describe("Type of the index ('code', 'chunk-summary', 'summary')."),
    name: z
      .string()
      .describe('Name of the application (unique across all Codemie Applications in one project).'),
    projectName: z.string().describe('Name of the project.'),
    projectSpaceVisible: z
      .boolean()
      .default(true)
      .optional()
      .describe(
        'Flag to determine if the application is visible in the project space (defaults to true).'
      ),
  })
  .describe('CodemieApplicationSpec defines the desired state of CodemieApplication.');
export type CodemieApplicationSpec = z.infer<typeof codemieApplicationSpecSchema>;

export const codemieApplicationStatusSchema = z
  .object({
    application: z.string().optional().describe('JSON representation of the application.'),
    error: z.string().optional().describe('Error message if something went wrong.'),
    id: z.string().optional().describe('ID of the application.'),
    value: z.string().optional().describe('Current status of the application.'),
  })
  .describe('CodemieApplicationStatus defines the observed state of CodemieApplication.');
export type CodemieApplicationStatus = z.infer<typeof codemieApplicationStatusSchema>;

export const codemieApplicationSchema = KubeObjectBaseSchema.extend({
  spec: codemieApplicationSpecSchema,
  status: codemieApplicationStatusSchema.optional(),
}).required();
export type CodemieApplication = z.infer<typeof codemieApplicationSchema>;
