import React from 'react';
import { TabPanel } from '../../../../../components/TabPanel';
import { FormContextProvider } from '../../../../../providers/Form';
import { StepperContextProvider } from '../../../../../providers/Stepper';
import { ValueOf } from '../../../../../types/global';
import { MAIN_TABS } from '../../constants';
import { Configuration } from './components/Inner';
import { Selection } from './components/Selection';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Create = () => {
  const baseDefaultValues = useDefaultValues();

  const [activeTab, setActiveTab] = React.useState<ValueOf<typeof MAIN_TABS>>(MAIN_TABS.SELECTION);

  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
        defaultValues: baseDefaultValues,
      }}
    >
      <TabPanel index={MAIN_TABS.SELECTION} value={activeTab}>
        <StepperContextProvider>
          <Selection setActiveTab={setActiveTab} />
        </StepperContextProvider>
      </TabPanel>
      <TabPanel index={MAIN_TABS.CONFIGURATION} value={activeTab}>
        <StepperContextProvider>
          <Configuration baseDefaultValues={baseDefaultValues} setActiveTab={setActiveTab} />
        </StepperContextProvider>
      </TabPanel>
    </FormContextProvider>
  );
};
