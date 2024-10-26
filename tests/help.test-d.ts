import { expectType, expectAssignable } from 'tsd';
import { Help, Command, CommandUnknownOpts, Option } from '..';

// Still exploring when to use Command/CommandUnknownOpts in Help.
//
// Reminder: we pass the command into the Help methods using JavaScript so
// no type checking there, but subclass is TypeScript.

// 'when subclass Help method with cmd arg as CommandUnknownOpts then no error'
{
  class MyHelp extends Help {
    subcommandTerm(cmd: CommandUnknownOpts) {
      return cmd.name();
    }
  }
}

// 'when subclass Help method with cmd arg as Command then no error'
{
  class MyHelp extends Help {
    subcommandTerm(cmd: Command) {
      return cmd.name();
    }
  }
}

// 'when pass type Command to visibleOptions then no error'
{
  const program = new Command().option('--foo').argument('<one>');
  program.createHelp().visibleOptions(program);
}

// 'when pass type CommandUnknownOpts to visibleOptions then no error'
{
  const program: CommandUnknownOpts = new Command()
    .option('--foo')
    .argument('<one>');
  program.createHelp().visibleOptions(program);
}

// 'when call visibleCommands then returns CommandUnknownOpts[]'
{
  const program = new Command().option('--foo').argument('<one>');
  const vo = program.createHelp().visibleCommands(program);
  expectType<CommandUnknownOpts[]>(vo);
}
