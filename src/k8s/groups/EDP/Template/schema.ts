import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

const IconSchema = z
  .object({
    base64data: z.string().describe('A base64 encoded PNG, JPEG, or SVG image.'),
    mediatype: z
      .string()
      .describe('Media type of the image, e.g., "image/svg+xml", "image/png", or "image/jpeg".'),
  })
  .describe('Icon defines the representation for template display.');

const MaintainerSchema = z
  .object({
    email: z.string().email().describe('Email address of the maintainer.'),
    name: z.string().describe('Name of the organizational entity maintaining the template.'),
  })
  .describe('Maintainer defines the individual responsible for maintaining the template.');

const templateSpecSchema = z
  .object({
    buildTool: z.string().describe('The build tool used to build the component from the template.'),
    category: z.string().optional().describe('Category of the template.'),
    description: z.string().describe('Detailed description of the template.'),
    displayName: z.string().describe('Display name of the template.'),
    framework: z.string().describe('Framework used to build the component from the template.'),
    icon: z
      .array(IconSchema)
      .max(1)
      .optional()
      .describe('Array containing a single icon for the template.'),
    keywords: z.array(z.string()).optional().describe('List of keywords describing the template.'),
    language: z
      .string()
      .describe('Programming language used to build the component from the template.'),
    maintainers: z
      .array(MaintainerSchema)
      .optional()
      .describe('Array of maintainers responsible for the template.'),
    maturity: z
      .enum([
        'planning',
        'pre-alpha',
        'alpha',
        'beta',
        'stable',
        'mature',
        'inactive',
        'deprecated',
      ])
      .optional()
      .describe('Maturity level of the template.'),
    minEDPVersion: z
      .string()
      .optional()
      .describe('Minimum EDP version that the template is compatible with.'),
    source: z.string().describe('Repository containing the source code for the template.'),
    type: z
      .string()
      .describe('Type of the template, e.g., application, library, autotest, infrastructure.'),
    version: z.string().describe('Version of the template.'),
  })
  .describe('TemplateSpec defines the desired state of Template.');

const templateSchema = KubeObjectBaseSchema.extend({
  spec: templateSpecSchema,
});

export type Template = z.infer<typeof templateSchema>;
