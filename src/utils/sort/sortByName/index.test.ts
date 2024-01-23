import { sortByName } from './index';

describe('checking sortByName', () => {
  test('checking with no-accent chars', () => {
    const testArray = ['Banana', 'Orange', '', undefined, 'Apple', 'Mango'];
    const sortedArray = testArray.sort(sortByName);

    const [item1, item2, item3, item4, item5, item6] = sortedArray;

    expect(item1).toMatch('Apple');
    expect(item2).toMatch('Banana');
    expect(item3).toMatch('Mango');
    expect(item4).toMatch('Orange');
    expect(item5).toBe('');
    expect(item6).toBeUndefined();
  });

  test('checking with accent chars', () => {
    const testArray = ['ä', 'a'];
    const sortedArray = testArray.sort(sortByName);

    const [item1, item2] = sortedArray;

    expect(item1).toMatch('a');
    expect(item2).toMatch('ä');
  });
});
