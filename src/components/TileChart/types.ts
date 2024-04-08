import { TileChartProps } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';

export interface MyTileChartProps extends TileChartProps {
  BoxSx?: object;
  error?: ApiError;
}
