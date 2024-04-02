import React from 'react';
import { ValueOf } from '../../../../../../../../types/global';
import { MAIN_TABS } from '../../../../../../constants';
import { CreateCodebaseFormValues } from '../../../../types';

export interface FormActionsProps {
  baseDefaultValues: Partial<CreateCodebaseFormValues>;
  setActiveTab: React.Dispatch<React.SetStateAction<ValueOf<typeof MAIN_TABS>>>;
}
