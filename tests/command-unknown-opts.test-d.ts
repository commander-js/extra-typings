import { Command, CommandUnknownOpts } from '..';
import { expectType } from 'tsd';

// Fallback location for CommandUnknownOpts if not better file for the test.

// 'when CommandUnknownOpts then opts().foo is allowed but unknown'
{
  const program: CommandUnknownOpts = new Command();
  const v = program.opts()['foo'];
  expectType<unknown>(v);
}
