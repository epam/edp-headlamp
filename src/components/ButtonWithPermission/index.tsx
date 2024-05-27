import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Button, ButtonProps, Tooltip } from '@mui/material';
import React from 'react';
import { DeepPartial } from '../../types/global';
import { ConditionalWrapper } from '../ConditionalWrapper';

export const ButtonWithPermission = ({
  item,
  actionCheckName,
  ButtonProps,
  children,
}: {
  item: DeepPartial<KubeObjectInterface>;
  actionCheckName: string;
  ButtonProps: ButtonProps;
  children: React.ReactNode;
}) => {
  const [allowed, setAllowed] = React.useState<boolean>(false);

  React.useEffect(() => {
    let isMounted = true;
    if (!!item) {
      item
        .getAuthorization(actionCheckName)
        .then((result: any) => {
          if (isMounted) {
            setAllowed(!!result.status?.allowed);
          }
        })
        .catch(() => {
          if (isMounted) {
            setAllowed(false);
          }
        });
    }

    return function cleanup() {
      isMounted = false;
    };
  }, [actionCheckName, item]);

  return (
    <ConditionalWrapper
      condition={!allowed}
      wrapper={(children) => <Tooltip title={'Forbidden'}>{children}</Tooltip>}
    >
      <div>
        <Button {...ButtonProps} disabled={ButtonProps?.disabled || !allowed}>
          {children}
        </Button>
      </div>
    </ConditionalWrapper>
  );
};
