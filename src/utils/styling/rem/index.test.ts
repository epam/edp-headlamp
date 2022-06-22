import { rem } from './index';

test('checking rem', () => {
    expect(rem(15)).toMatch('0.9375rem');
    expect(rem(16)).toMatch('1rem');
});
