import { mapEvery } from './index';

test('checking mapEvery', () => {
  expect(
    mapEvery(
      new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3'],
        ['key4', 'value4'],
      ]),
      value => typeof value === 'string'
    )
  ).toBe(true);
  expect(
    mapEvery(
      new Map([
        ['key1', 'value1'],
        ['key2', null],
        ['key3', 'value3'],
        ['key4', 'value4'],
      ]),
      value => !!value
    )
  ).toBe(false);
  expect(
    mapEvery(
      new Map([
        ['key1', 2],
        ['key2', 4],
        ['key3', 6],
        ['key4', 18],
      ]),
      value => value > 3
    )
  ).toBe(false);
});
