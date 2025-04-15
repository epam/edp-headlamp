import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

const LabelSelectorRequirementSchema = z.object({
  key: z.string(),
  operator: z.string(),
  values: z.array(z.string()).optional(),
});

const AllowedRegexSchema = z.object({
  allowed: z.array(z.string()).optional(),
  allowedRegex: z.string().optional(),
  matchExpressions: z.array(LabelSelectorRequirementSchema).optional(),
  matchLabels: z.record(z.string()).optional(),
});

const NetworkPolicyPortSchema = z.object({
  endPort: z.number().optional(),
  port: z.union([z.string(), z.number()]).optional(),
  protocol: z.string().optional().default('TCP'),
});

const NetworkPolicyPeerSchema = z.object({
  ipBlock: z
    .object({
      cidr: z.string(),
      except: z.array(z.string()).optional(),
    })
    .optional(),
  namespaceSelector: z
    .object({
      matchLabels: z.record(z.string()).optional(),
      matchExpressions: z.array(LabelSelectorRequirementSchema).optional(),
    })
    .optional(),
  podSelector: z
    .object({
      matchLabels: z.record(z.string()).optional(),
      matchExpressions: z.array(LabelSelectorRequirementSchema).optional(),
    })
    .optional(),
});

const NetworkPolicyIngressRuleSchema = z.object({
  from: z.array(NetworkPolicyPeerSchema).optional(),
  ports: z.array(NetworkPolicyPortSchema).optional(),
});

const NetworkPolicyEgressRuleSchema = z.object({
  to: z.array(NetworkPolicyPeerSchema).optional(),
  ports: z.array(NetworkPolicyPortSchema).optional(),
});

const RoleBindingSchema = z.object({
  clusterRoleName: z.string(),
  subjects: z.array(
    z.object({
      apiGroup: z.string().optional(),
      kind: z.string(),
      name: z.string(),
      namespace: z.string().optional(),
    })
  ),
});

const AllowedServicesSchema = z.object({
  externalName: z.boolean().default(true),
  loadBalancer: z.boolean().default(true),
  nodePort: z.boolean().default(true),
});

const OwnerProxySettingsSchema = z.object({
  kind: z.enum([
    'Nodes',
    'StorageClasses',
    'IngressClasses',
    'PriorityClasses',
    'RuntimeClasses',
    'PersistentVolumes',
  ]),
  operations: z.array(z.enum(['List', 'Update', 'Delete'])).min(1),
});

const TenantOwnerSchema = z.object({
  kind: z.enum(['User', 'Group', 'ServiceAccount']),
  name: z.string(),
  clusterRoles: z.array(z.string()).default(['admin', 'capsule-namespace-deleter']),
  proxySettings: z.array(OwnerProxySettingsSchema).optional(),
});

const ResourceQuotaSpecSchema = z.object({
  hard: z.record(z.union([z.string(), z.number()]).optional()).optional(),
  scopeSelector: z
    .object({
      matchExpressions: z
        .array(
          z.object({
            operator: z.string(),
            scopeName: z.string(),
            values: z.array(z.string()).optional(),
          })
        )
        .optional(),
    })
    .optional(),
  scopes: z.array(z.string()).optional(),
});

const TenantSpecSchema = z.object({
  additionalRoleBindings: z.array(RoleBindingSchema).optional(),
  containerRegistries: z
    .object({
      allowed: z.array(z.string()).optional(),
      allowedRegex: z.string().optional(),
    })
    .optional(),
  cordoned: z.boolean().optional(),
  imagePullPolicies: z.array(z.enum(['Always', 'Never', 'IfNotPresent'])).optional(),
  ingressOptions: z
    .object({
      allowWildcardHostnames: z.boolean().optional(),
      allowedClasses: AllowedRegexSchema.optional(),
      allowedHostnames: AllowedRegexSchema.optional(),
      hostnameCollisionScope: z.enum(['Cluster', 'Tenant', 'Namespace', 'Disabled']).optional(),
    })
    .optional(),
  limitRanges: z
    .object({
      items: z
        .array(
          z.object({
            limits: z.array(
              z.object({
                type: z.string(),
                default: z.record(z.union([z.string(), z.number()]).optional()).optional(),
                defaultRequest: z.record(z.union([z.string(), z.number()]).optional()).optional(),
                min: z.record(z.union([z.string(), z.number()]).optional()).optional(),
                max: z.record(z.union([z.string(), z.number()]).optional()).optional(),
                maxLimitRequestRatio: z
                  .record(z.union([z.string(), z.number()]).optional())
                  .optional(),
              })
            ),
          })
        )
        .optional(),
    })
    .optional(),
  namespaceOptions: z
    .object({
      additionalMetadata: z
        .object({
          annotations: z.record(z.string()).optional(),
          labels: z.record(z.string()).optional(),
        })
        .optional(),
      forbiddenAnnotations: AllowedRegexSchema.optional(),
      forbiddenLabels: AllowedRegexSchema.optional(),
      quota: z.number().min(1).optional(),
    })
    .optional(),
  networkPolicies: z
    .object({
      items: z.array(
        z.object({
          podSelector: z
            .object({
              matchLabels: z.record(z.string()).optional(),
              matchExpressions: z.array(LabelSelectorRequirementSchema).optional(),
            })
            .optional(),
          ingress: z.array(NetworkPolicyIngressRuleSchema).optional(),
          egress: z.array(NetworkPolicyEgressRuleSchema).optional(),
          policyTypes: z.array(z.enum(['Ingress', 'Egress'])).optional(),
        })
      ),
    })
    .optional(),
  nodeSelector: z.record(z.string()).optional(),
  owners: z.array(TenantOwnerSchema),
  preventDeletion: z.boolean().optional(),
  priorityClasses: AllowedRegexSchema.optional(),
  resourceQuotas: z
    .object({
      items: z.array(ResourceQuotaSpecSchema).optional(),
      scope: z.enum(['Tenant', 'Namespace']).optional(),
    })
    .optional(),
  runtimeClasses: AllowedRegexSchema.optional(),
  serviceOptions: z
    .object({
      additionalMetadata: z
        .object({
          annotations: z.record(z.string()).optional(),
          labels: z.record(z.string()).optional(),
        })
        .optional(),
      allowedServices: AllowedServicesSchema.optional(),
      externalIPs: z
        .object({
          allowed: z.array(
            z
              .string()
              .regex(
                /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/,
                'Invalid IP format'
              )
          ),
        })
        .optional(),
    })
    .optional(),
  storageClasses: AllowedRegexSchema.optional(),
});

export const tenantSchema = KubeObjectBaseSchema.extend({
  spec: TenantSpecSchema,
  status: z
    .object({
      namespaces: z.array(z.string()).optional(),
      size: z.number(),
      state: z.enum(['Cordoned', 'Active']).default('Active'),
    })
    .optional(),
});

export type Tenant = z.infer<typeof tenantSchema>;
