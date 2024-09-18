import { PageDescription } from '../../../../types/pages';

export interface ConfigurationPageContentProps {
  creationForm: {
    component: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    permission: {
      allowed: boolean;
      reason: string | undefined;
    };
    label?: string;
    isDisabled?: boolean;
  };
  children: React.ReactNode;
  pageDescription: PageDescription;
}
