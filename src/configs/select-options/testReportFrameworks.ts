import { TEST_REPORT_FRAMEWORK } from '../../constants/testReportFrameworks';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const testReportFrameworkSelectOptions: SelectOption[] = [TEST_REPORT_FRAMEWORK.ALLURE].map(
  (value) => ({
    label: capitalizeFirstLetter(value),
    value,
  })
);
