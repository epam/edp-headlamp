import { z } from 'zod';
import { KubeObjectBaseSchema } from '../../../common';

export const approvalTaskApproveSchema = z
  .object({
    approvedBy: z.string().describe('Indicates the identity of the approver.'),
    comment: z.string().optional().describe('The comment provided by the approver.'),
  })
  .describe('Approve is the approval information.');

export type ApprovalTaskApprove = z.infer<typeof approvalTaskApproveSchema>;

export const approvalTaskSpecSchema = z
  .object({
    action: z
      .enum(['Pending', 'Approved', 'Rejected', 'Canceled'])
      .default('Pending')
      .describe('Action to be taken on the task.'),
    approve: approvalTaskApproveSchema.optional().describe('Approval information.'),
    description: z
      .string()
      .default('Proceed')
      .describe('Description shown to the user for the approval action.'),
  })
  .describe('ApprovalTaskSpec defines the desired state of ApprovalTask.');

export type ApprovalTaskSpec = z.infer<typeof approvalTaskSpecSchema>;

export const approvalTaskSchema = KubeObjectBaseSchema.extend({
  spec: approvalTaskSpecSchema,
}).required();

export type ApprovalTask = z.infer<typeof approvalTaskSchema>;
