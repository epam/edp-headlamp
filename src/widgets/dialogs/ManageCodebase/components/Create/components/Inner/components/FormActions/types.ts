import React from 'react';
import { ValueOf } from '../../../../../../../../../types/global';
import { MAIN_TABS } from '../../../../../../constants';
import { ManageCodebaseFormValues } from '../../../../../../types';

export interface FormActionsProps {
  baseDefaultValues: Partial<ManageCodebaseFormValues>;
  setActiveTab: React.Dispatch<React.SetStateAction<ValueOf<typeof MAIN_TABS>>>;
}
