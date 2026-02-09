import { z } from 'zod';

const StringDictSchema = z.record(z.string());

const KubeOwnerReferenceSchema = z.object({
  apiVersion: z.string(),
  blockOwnerDeletion: z.boolean(),
  controller: z.boolean(),
  kind: z.string(),
  name: z.string(),
  uid: z.string(),
});

const KubeManagedFieldsEntrySchema = z.object({
  apiVersion: z.string(),
  fieldsType: z.string(),
  fieldsV1: z.object({}),
  manager: z.string(),
  operation: z.string(),
  subresource: z.string(),
  timestamp: z.string(),
});

const KubeMetadataSchema = z.object({
  annotations: StringDictSchema.optional(),
  creationTimestamp: z.string(),
  deletionGracePeriodSeconds: z.number().optional(),
  deletionTimestamp: z.string().optional(),
  finalizers: z.string().array().optional(),
  generateName: z.string().optional(),
  generation: z.number().optional(),
  labels: StringDictSchema.optional(),
  managedFields: z.array(KubeManagedFieldsEntrySchema).optional(),
  name: z.string(),
  namespace: z.string().optional(),
  ownerReferences: z.array(KubeOwnerReferenceSchema).optional(),
  resourceVersion: z.string().optional(),
  selfLink: z.string().optional(),
  uid: z.string(),
});

const KubeObjectBaseSchema = z.object({
  apiVersion: z.string(),
  kind: z.string(),
  metadata: KubeMetadataSchema,
});

const KubeObjectListBaseSchema = z.object({
  apiVersion: z.string(),
  items: z.array(KubeObjectBaseSchema),
  kind: z.string(),
  metadata: KubeMetadataSchema,
});

type KubeObjectBase = z.infer<typeof KubeObjectBaseSchema>;
type KubeObjectListBase<T extends KubeObjectBase> = z.infer<typeof KubeObjectListBaseSchema> & {
  items: T[];
};

export {
  KubeObjectBaseSchema,
  KubeMetadataSchema,
  KubeManagedFieldsEntrySchema,
  KubeOwnerReferenceSchema,
  StringDictSchema,
};

export type { KubeObjectBase, KubeObjectListBase };
