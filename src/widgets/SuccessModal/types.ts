export interface SuccessDialogForwardedProps {
  dialogTitle: string;
  title?: string;
  description?: string;
  goToLink: {
    routeName: string;
    text: string;
    routeParams: Record<string, string>;
  };
}
