export interface QuotaDetails {
  hard?: number;
  used?: number;
  usedPercentage?: number;
  hard_initial?: string;
  used_initial?: string;
  [key: string]: any;
}

export interface ParsedQuotas {
  [entity: string]: QuotaDetails;
}
