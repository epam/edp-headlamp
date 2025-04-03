import { DialogProps } from '../../../providers/Dialog/types';
import { ValueOf } from '../../../types/global';
import { WIDGET_TYPE } from './constants';

export interface AddNewWidgetProps
  extends DialogProps<{
    userWidgets: WidgetConfig[];
    setUserWidgets: (widgets: WidgetConfig[]) => void;
  }> {}

export type WidgetType = ValueOf<typeof WIDGET_TYPE>;
export type WidgetConfig<T = unknown> = {
  id: string;
  type: WidgetType;
  data: T;
};
