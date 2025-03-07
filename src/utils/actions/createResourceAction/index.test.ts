import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { RESOURCE_ACTION } from '../../../constants/resourceActions';
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
      type: RESOURCE_ACTION.EDIT,
      label: 'Edit',
      callback: jest.fn(),
      icon: 'edit-icon',
      isTextButton: true,
    });

    expect(action.name).toBe(RESOURCE_ACTION.EDIT);
    expect(action.label).toBe('Edit');
    expect(action.icon).toBe('edit-icon');
    expect(action.disabled.status).toBe(false);
    expect(action.isTextButton).toBe(true);
  });

  it('should disable the action if the resource is protected for deletion', () => {
    const protectedItem = {
      ...mockItem,
      metadata: {
        labels: {
          [RESOURCE_LABEL_SELECTOR_PROTECTED]: 'delete',
        },
      },
    } as unknown as KubeObjectInterface;

    const action = createResourceAction({
      item: protectedItem,
      type: RESOURCE_ACTION.DELETE,
      label: 'Delete',
      callback: jest.fn(),
    });

    expect(action.disabled.status).toBe(true);
    expect(action.disabled.reason).toBe('This resource is protected from deletion.');
  });

  it('should apply protected state for multiple protections', () => {
    const protectedItem = {
      ...mockItem,
      metadata: {
        labels: {
          [RESOURCE_LABEL_SELECTOR_PROTECTED]: 'update-delete',
        },
      },
    } as unknown as KubeObjectInterface;

    const actionDelete = createResourceAction({
      item: protectedItem,
      type: RESOURCE_ACTION.DELETE,
      label: 'Delete',
      callback: jest.fn(),
    });

    expect(actionDelete.disabled.status).toBe(true);
    expect(actionDelete.disabled.reason).toBe('This resource is protected from deletion.');

    const actionUpdate = createResourceAction({
      item: protectedItem,
      type: RESOURCE_ACTION.EDIT,
      label: 'Edit',
      callback: jest.fn(),
    });

    expect(actionUpdate.disabled.status).toBe(true);
    expect(actionUpdate.disabled.reason).toBe('This resource is protected from updates.');
  });

  it('should call the callback function when the action is executed', () => {
    const mockCallback = jest.fn();
    const action = createResourceAction({
      item: mockItem,
      type: RESOURCE_ACTION.EDIT,
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
