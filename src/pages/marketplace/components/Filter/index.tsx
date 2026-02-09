import React from 'react';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../../providers/Filter/components/Filter/components/SearchControl';
import { getClusterSettings } from '../../../../utils/getClusterSettings';

export const TemplateFilter = () => {
  return (
    <Filter
      controls={{
        search: {
          component: <SearchControl />,
        },
        ...((getClusterSettings()?.allowedNamespaces || []).length > 1
          ? {
              namespace: {
                component: <NamespaceControl />,
              },
            }
          : {}),
      }}
    />
  );
};
