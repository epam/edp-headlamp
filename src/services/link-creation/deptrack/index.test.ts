/**
 * @jest-environment jsdom
 */

import { DepTrackURLService } from './index';

describe('testing link-creation DepTrackURLService', () => {
  it('should successfully create DepTrack project api url based on given depTrackURLOrigin, codebaseName params', () => {
    expect(
      DepTrackURLService.createProjectByNameApiUrl(
        'https://deptrack-test.com',
        'test-codebase-name'
      )
    ).toEqual('https://deptrack-test.com/api/v1/project?name=test-codebase-name');
  });

  it('should successfully create DepTrack metrics api url based on given depTrackURLOrigin, codebaseName params', () => {
    expect(
      DepTrackURLService.createProjectVulnsApiUrl('https://deptrack-test.com', 'test-uuid')
    ).toEqual('https://deptrack-test.com/api/v1/metrics/project/test-uuid/current');
  });
});
