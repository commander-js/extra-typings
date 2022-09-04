import { Command, CommandWeakOpts } from '..';
import { expectType } from 'tsd';

if ('when weakOpts then opts.foo is allowed but unknown') {
  const program: CommandWeakOpts = new Command();
  const v = program.opts()['foo'];
  expectType<unknown>(v);
}
