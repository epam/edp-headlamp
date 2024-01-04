import React from 'react';

export interface NamespacesGuardDialogForwardedProps {
    defaultNamespaceIsSet: boolean;
    allowedNamespacesIsSet: boolean;
    setKey: React.Dispatch<React.SetStateAction<string>>;
    onDialogClose: () => void;
}
