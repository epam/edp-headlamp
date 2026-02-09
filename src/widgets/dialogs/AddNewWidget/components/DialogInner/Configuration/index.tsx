import React from 'react';
import { WIDGET_TYPE } from '../../../constants';
import { AppVersionWidgetForm } from '../../../forms/AppVersionWidgetForm';
import { WidgetType } from '../../../types';

const widgetFormRenderer = (
  widgetType: WidgetType,
  addButtonContainerRef: React.RefObject<HTMLDivElement>
) => {
  switch (widgetType) {
    case WIDGET_TYPE.APP_VERSION:
      return (
        <AppVersionWidgetForm
          widgetType={widgetType}
          addButtonContainerRef={addButtonContainerRef}
        />
      );
    default:
      return null;
  }
};

export const Configuration = ({
  widgetType,
  addButtonContainerRef,
}: {
  widgetType: WidgetType;
  addButtonContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  return <>{widgetFormRenderer(widgetType, addButtonContainerRef)}</>;
};
