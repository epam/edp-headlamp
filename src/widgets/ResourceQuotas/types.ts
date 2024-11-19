export interface QuotaDetails {
  hard?: number;
  used?: number;
  usedPercentage?: number;
  hard_initial?: string;
  used_initial?: string;
}

export interface ParsedQuotas {
  [entity: string]: QuotaDetails;
}

