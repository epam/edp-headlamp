import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { ErrorContent } from '../../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { RefPortal } from '../../../../../components/RefPortal';
import { CODEBASE_TYPE } from '../../../../../constants/codebaseTypes';
import { CodebaseKubeObject } from '../../../../../k8s/groups/EDP/Codebase';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE } from '../../../../../k8s/groups/EDP/Codebase/labels';
import { CodebaseKubeObjectInterface } from '../../../../../k8s/groups/EDP/Codebase/types';
import { FormAutocompleteSingle } from '../../../../../providers/Form/components/FormAutocompleteSingle';
import { useCurrentDialog } from '../../providers/CurrentDialog/hooks';
import { WidgetType } from '../../types';

export const AppVersionWidgetForm = ({
  widgetType,
  addButtonContainerRef,
}: {
  widgetType: WidgetType;
  addButtonContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  const {
    state: { closeDialog },
    props: { userWidgets, setUserWidgets },
  } = useCurrentDialog();

  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      appName: '',
    },
  });

  const [_codebases, codebasesError] = CodebaseKubeObject.useList({
    labelSelector: `${CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE}=${CODEBASE_TYPE.APPLICATION}`,
  });
  const codebases = _codebases as CodebaseKubeObjectInterface[] | null;

  const codebasesOptions = React.useMemo(
    () =>
      (codebases || []).map((codebase) => ({
        label: codebase.metadata.name,
        value: codebase.metadata.name,
      })),
    [codebases]
  );

  const handleAddButtonClick = React.useCallback(() => {
    const newWidget = {
      type: widgetType,
      data: form.getValues(),
      id: uuidv4(),
    };
    setUserWidgets([...(userWidgets || []), newWidget]);
    closeDialog();
  }, [closeDialog, form, setUserWidgets, userWidgets, widgetType]);

  const appNameFieldValue = form.watch('appName');

  return (
    <>
      <LoadingWrapper isLoading={codebases === null && !codebasesError}>
        {codebasesError && <ErrorContent error={codebasesError} />}

        <FormAutocompleteSingle
          {...form.register('appName')}
          name="appName"
          control={form.control}
          placeholder={'Select Application'}
          options={codebasesOptions}
          errors={form.formState.errors}
        />
      </LoadingWrapper>
      <RefPortal containerRef={addButtonContainerRef}>
        <Button onClick={handleAddButtonClick} disabled={!appNameFieldValue}>
          add
        </Button>
      </RefPortal>
    </>
  );
};
