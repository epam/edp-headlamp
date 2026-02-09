import { ValueOf } from '../../types/global';
import { CODEBASE_COMMON_LANGUAGES } from './index';

export interface CodebaseMappingItemInterface {
  name: string;
  value: string;
  icon?: string;
}

export interface CodebaseInterface {
  language: CodebaseMappingItemInterface;
  frameworks: Record<string, CodebaseMappingItemInterface>;
  buildTools: Record<string, CodebaseMappingItemInterface>;
  autoTestReportFrameworks?: Record<string, CodebaseMappingItemInterface>;
}

export type CodebaseMappingKey = ValueOf<typeof CODEBASE_COMMON_LANGUAGES>;
