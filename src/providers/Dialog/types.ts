import { MODAL_MAPPING } from './mapping';

export interface ActiveDialog<ForwardedPropsType = {}> {
  forwardedProps?: ForwardedPropsType;
  open: boolean;
}

export type ModalName = keyof typeof MODAL_MAPPING;

export type DialogProviderState<ForwardedPropsType> =
  | {
      [key in ModalName]: ActiveDialog<ForwardedPropsType>;
    }
  | {};

export interface DialogContextProviderValue<ForwardedPropsType> {
  dialogState: DialogProviderState<ForwardedPropsType> | {};
  setDialog: ({
    modalName,
    forwardedProps,
  }: {
    modalName: ModalName;
    forwardedProps?: unknown;
  }) => void;
  openDialog: (modalName: ModalName) => void;
  closeDialog: (modalName: ModalName) => void;
}

export interface DialogForwardedProps<Data> {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  forwardedProps: Data;
}
