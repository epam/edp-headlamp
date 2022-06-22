import { capitalizeFirstLetter } from './index';

test('checking capitalizeFirstLetterFunc', () => {
    expect(capitalizeFirstLetter('test')).toMatch('Test');
});
