import { codebaseImageStreamsWithTagsMock } from '../../mocks/codebaseImageStreamsWithTags.mock';
import { createImageStreamTags } from './index';

const { imageStream, verifiedImageStream } = codebaseImageStreamsWithTagsMock;
describe('testing createImageStreamTags util fn', () => {
    it('should return correct array of tag options', () => {
        const result = createImageStreamTags(imageStream, verifiedImageStream);
        expect(result).toEqual([
            {
                label: '[STABLE] - main-0.1.0-20230731-143228',
                value: 'stable::main-0.1.0-20230731-143228',
            },
            {
                label: '[LATEST] - main-0.1.0-20230731-143228',
                value: 'latest::main-0.1.0-20230731-143228',
            },
            {
                label: 'main-0.1.0-20230731-094439',
                value: 'main-0.1.0-20230731-094439',
            },
            {
                label: 'main-0.1.0-20230731-133849',
                value: 'main-0.1.0-20230731-133849',
            },
            {
                label: 'main-0.1.0-20230731-134738',
                value: 'main-0.1.0-20230731-134738',
            },
            {
                label: 'main-0.1.0-20230731-143228',
                value: 'main-0.1.0-20230731-143228',
            },
        ]);
    });
});
