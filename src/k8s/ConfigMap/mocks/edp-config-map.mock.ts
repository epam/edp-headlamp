import { ValueOf } from '../../../types/global';
import { CONTAINER_REGISTRY_PLATFORM, CONTAINER_REGISTRY_TYPE } from '../constants';

export const createEmptyEdpConfigMapMock = (
  platform: ValueOf<typeof CONTAINER_REGISTRY_PLATFORM>
) => ({
  metadata: {
    name: 'edp-config',
    namespace: 'test-namespace',
  },
  data: {
    aws_region: 'eu-central-1',
    container_registry_host: 'registry.test.com',
    container_registry_space: 'test-namespace',
    container_registry_type: '',
    dns_wildcard: 'test-dns-wildcard',
    edp_name: 'test-namespace',
    edp_version: '3.8.0-SNAPSHOT.23',
    platform: platform,
  },
  kind: 'ConfigMap',
});

export const createEdpConfigMapMock = (
  type: ValueOf<typeof CONTAINER_REGISTRY_TYPE>,
  platform: ValueOf<typeof CONTAINER_REGISTRY_PLATFORM>
) => ({
  metadata: {
    name: 'edp-config',
    namespace: 'test-namespace',
  },
  data: {
    aws_region: 'eu-central-1',
    container_registry_host: 'registry.test.com',
    container_registry_space: 'test-namespace',
    container_registry_type: type,
    dns_wildcard: 'test-dns-wildcard',
    edp_name: 'test-namespace',
    edp_version: '3.8.0-SNAPSHOT.23',
    platform: platform,
  },
  kind: 'ConfigMap',
});
