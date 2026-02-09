import { sortKubeObjectByCreationTimestamp } from './index';

test('checking sortKubeObjectByCreationTimestamp', () => {
  const testArray = [
    {
      apiVersion: 'v2.edp.epam.com/v1',
      kind: 'Codebase',
      metadata: {
        name: 'test-codebase-1',
        namespace: 'edp-delivery-vp-dev',
        creationTimestamp: '2022-08-21T16:30:14Z',
      },
    },
    {
      apiVersion: 'v2.edp.epam.com/v1',
      kind: 'Codebase',
      metadata: {
        name: 'test-codebase-2',
        namespace: 'edp-delivery-vp-dev',
        creationTimestamp: '2022-11-22T11:03:14Z',
      },
    },
    {
      apiVersion: 'v2.edp.epam.com/v1',
      kind: 'Codebase',
      metadata: {
        name: 'test-codebase-3',
        namespace: 'edp-delivery-vp-dev',
        creationTimestamp: '2022-11-21T19:03:14Z',
      },
    },
  ];
  const sortedArray = testArray.sort(sortKubeObjectByCreationTimestamp);

  const [item1, item2, item3] = sortedArray;

  expect(item1.metadata.name).toBe('test-codebase-2');
  expect(item2.metadata.name).toBe('test-codebase-3');
  expect(item3.metadata.name).toBe('test-codebase-1');
});
