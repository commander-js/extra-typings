import { expect, test } from '@jest/globals';
import { createOption } from '..';

test('when createOption without description then option has flags', () => {
  const flags = '-e, --example';
  const option = createOption(flags);
  expect(option.flags).toEqual(flags);
  expect(option.description).toEqual('');
});

test('when createOption with description then option has flags and description', () => {
  const flags = '-e, --example';
  const description = 'example option';
  const option = createOption(flags, description);
  expect(option.flags).toEqual(flags);
  expect(option.description).toEqual(description);
});
