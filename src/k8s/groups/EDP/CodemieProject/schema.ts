import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

const codemieRefSchema = z
  .object({
    kind: z
      .string()
      .default('Codemie')
      .optional()
      .describe("Specifies the kind of the referenced Codemie resource (default: 'Codemie')."),
    name: z.string().describe('Specifies the name of the referenced Codemie resource.'),
  })
  .describe('CodemieRef is a reference to a Codemie resource.');

export type CodemieRef = z.infer<typeof codemieRefSchema>;

export const codemieProjectSpecSchema = z
  .object({
    codemieRef: codemieRefSchema,
    name: z
      .string()
      .describe('Unique name for the CodemieProject. Should be unique across all CodemieProjects.'),
  })
  .describe('CodemieProjectSpec defines the desired state of CodemieProject.');
export type CodemieProjectSpec = z.infer<typeof codemieProjectSpecSchema>;

export const codemieProjectStatusSchema = z
  .object({
    error: z.string().optional().describe('Error message if something went wrong.'),
    value: z.string().optional().describe('Status of the CodemieProject.'),
  })
  .describe('CodemieProjectStatus defines the observed state of CodemieProject.');
export type CodemieProjectStatus = z.infer<typeof codemieProjectStatusSchema>;

export const codemieProjectSchema = KubeObjectBaseSchema.extend({
  spec: codemieProjectSpecSchema,
  status: codemieProjectStatusSchema.optional(),
}).required();
export type CodemieProject = z.infer<typeof codemieProjectSchema>;
