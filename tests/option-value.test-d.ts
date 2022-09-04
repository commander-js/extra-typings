import { expectType } from 'tsd';
import { Command } from '..';

if ('getOptionValue is unknown when key is unknown') {
  const program = new Command()
    .option('-f, --foo');
  
  const v = program.getOptionValue('bar');
  expectType<unknown>(v);
}

if ('getOptionValue result is typed when key is known') {
  const program = new Command()
    .option('-f, --foo');
  const v = program.getOptionValue('foo');
  expectType<true | undefined>(v);
}
