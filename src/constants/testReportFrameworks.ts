import { ValueOf } from '../types/global';

export const TEST_REPORT_FRAMEWORK = {
  ALLURE: 'allure',
} as const;

export type TestReportFramework = ValueOf<typeof TEST_REPORT_FRAMEWORK>;
