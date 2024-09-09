import { PageDescription } from '../../../../types/pages';
import { PermissionSet } from '../../../../types/permissions';

export interface ConfigurationPageContentProps {
  creationForm: {
    component: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    permissions: PermissionSet;
    label?: string;
    isDisabled?: boolean;
  };
  children: React.ReactNode;
  pageDescription: PageDescription;
}
