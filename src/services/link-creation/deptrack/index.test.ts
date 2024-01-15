/**
 * @jest-environment jsdom
 */

import { DepTrackURLService } from './index';

describe('testing link-creation DepTrackURLService', () => {
    it('should successfully create DepTrack widget href based on given depTrackURLOrigin, codebaseName and branch params', () => {
        expect(
            DepTrackURLService.createDepTrackWidgetImageHref(
                'https://deptrack-test.com',
                'test-codebase-name',
                'test-branch-name'
            )
        ).toEqual(
            'https://deptrack-test.com/api/v1/badge/vulns/project/test-codebase-name/test-branch-name'
        );
    });
});
