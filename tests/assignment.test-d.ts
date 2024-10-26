import { expectAssignable, expectNotAssignable } from 'tsd';
import { Command, CommandUnknownOpts, Option } from '..';

// 'when assign Command to CommandUnknownOpts then no error'
{
  const c = new Command();
  expectAssignable<CommandUnknownOpts>(c);
}

// 'when assign CommandUnknownOpts to Command then error'
{
  const custom: CommandUnknownOpts = new Command();
  expectNotAssignable<Command>(custom);
}
