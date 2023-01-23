
import { createCommand } from '..';

test('when createCommand without name then command has empty name', () => {
  const cmd = createCommand();
  expect(cmd.name()).toEqual('')
});

test('when createCommand with name then command has name', () => {
  const cmd = createCommand('name');
  expect(cmd.name()).toEqual('name')
});
