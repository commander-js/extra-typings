import { expectAssignable, expectNotAssignable } from 'tsd';
import { Command, CommandUnknownOpts, Option } from '..';

if ('when assign Command to CommandUnknownOpts then no error') {
  const c = new Command();
  expectAssignable<CommandUnknownOpts>(c);
}

if ('when assign CommandUnknownOpts to Command then error') {
  const custom: CommandUnknownOpts = new Command();
  expectNotAssignable<Command>(custom);
}
