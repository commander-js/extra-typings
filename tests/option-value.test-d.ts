import { expectType } from 'tsd';
import { Command } from '..';

// 'when getOptionValue is unknown then key is unknown'
{
  const program = new Command().option('-f, --foo');

  const v = program.getOptionValue('bar');
  expectType<unknown>(v);
}

// 'when getOptionValue result is typed then key is known'
{
  const program = new Command().option('-f, --foo');
  const v = program.getOptionValue('foo');
  expectType<true | undefined>(v);
}
