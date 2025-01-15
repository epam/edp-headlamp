/**
 * @jest-environment jsdom
 */

import { DepTrackURLService } from './index';

describe('testing link-creation DepTrackURLService', () => {
  it('should successfully create DepTrack project dashboard link', () => {
    expect(
      DepTrackURLService.createDashboardLink('https://deptrack-test.com', 'test-project-name')
    ).toEqual('https://deptrack-test.com/projects/test-project-name');
  });
});
