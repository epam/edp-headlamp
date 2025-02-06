import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { RESOURCE_ACTIONS } from '../../../constants/resourceActions';
import { RESOURCE_LABEL_SELECTOR_PROTECTED } from '../../../k8s/common/labels';
import { createResourceAction } from './index';

describe('createResourceAction', () => {
  const mockItem: KubeObjectInterface = {
    metadata: {
      labels: {},
    },
  } as KubeObjectInterface;

  it('should create an action with the given parameters', () => {
    const action = createResourceAction({
      item: mockItem,
      type: RESOURCE_ACTIONS.EDIT,
      label: 'Edit',
      callback: jest.fn(),
      icon: 'edit-icon',
      isTextButton: true,
    });

    expect(action.name).toBe(RESOURCE_ACTIONS.EDIT);
    expect(action.label).toBe('Edit');
    expect(action.icon).toBe('edit-icon');
    expect(action.disabled.status).toBe(false);
    expect(action.isTextButton).toBe(true);
  });

  it('should disable the action if the resource is protected and the action is delete', () => {
    const protectedItem = {
      ...mockItem,
      metadata: {
        labels: {
          [RESOURCE_LABEL_SELECTOR_PROTECTED]: 'true',
        },
      },
    } as unknown as KubeObjectInterface;

    const action = createResourceAction({
      item: protectedItem,
      type: RESOURCE_ACTIONS.DELETE,
      label: 'Delete',
      callback: jest.fn(),
    });

    expect(action.disabled.status).toBe(true);
    expect(action.disabled.reason).toBe('This resource is protected from deletion.');
  });

  it('should use the provided disabled status and reason if the resource is not protected', () => {
    const action = createResourceAction({
      item: mockItem,
      type: RESOURCE_ACTIONS.DELETE,
      label: 'Delete',
      callback: jest.fn(),
      disabled: {
        status: true,
        reason: 'Custom reason',
      },
    });

    expect(action.disabled.status).toBe(true);
    expect(action.disabled.reason).toBe('Custom reason');
  });

  it('should call the callback function when the action is executed', () => {
    const mockCallback = jest.fn();
    const action = createResourceAction({
      item: mockItem,
      type: RESOURCE_ACTIONS.EDIT,
      label: 'Edit',
      callback: mockCallback,
    });

    const mockEvent = {
      stopPropagation: jest.fn(),
    };

    action.action(mockEvent as any);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledWith(mockItem);
  });
});
