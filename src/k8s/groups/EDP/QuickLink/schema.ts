import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

const quickLinkSpecSchema = z
  .object({
    icon: z.string().describe('Base64 encoded SVG icon for the component.'),
    type: z
      .enum(['default', 'system'])
      .default('default')
      .describe(
        "Type of the quick link. Possible values are 'default' and 'system'. Default is 'default'."
      ),
    url: z
      .string()
      .default('')
      .describe('URL specifying a link to the component. Default is an empty string.'),
    visible: z
      .boolean()
      .default(true)
      .describe("Specifies whether a component is visible. Default is 'true'."),
  })
  .describe('QuickLinkSpec defines the desired state of QuickLink.');

export const quickLinkSchema = KubeObjectBaseSchema.extend({
  spec: quickLinkSpecSchema,
});

export type QuickLink = z.infer<typeof quickLinkSchema>;
