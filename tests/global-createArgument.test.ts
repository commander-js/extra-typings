
import { createArgument } from '..';

test('when createArgument without description then argument has name', () => {
  const name = 'foo';
  const argument = createArgument(name);
  expect(argument.name()).toEqual(name);
  expect(argument.description).toEqual('');
});

test('when createArgument with description then argument has name and description', () => {
  const name = 'foo';
  const description = 'example argument';
  const argument = createArgument(name, description);
  expect(argument.name()).toEqual(name);
  expect(argument.description).toEqual(description);
});
