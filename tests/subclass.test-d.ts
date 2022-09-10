import { expectType } from 'tsd';
import { Command, Option, CommandOptions, InferCommmandArguments, ExecutableCommandOptions, OptionValues } from '..';

// Breaking: need to add type parameter for use in super constructor
class MyOption<Usage extends string = ''> extends Option<Usage> {
    myFunction(): void {
      // do nothing
  }
}

class MyCommand extends Command {
  createCommand(name?: string): MyCommand {
    return new MyCommand(name);
  }
  createOption(flags: string, description?: string): MyOption {
    return new MyOption(flags, description);
  }

  myFunction(): void {
    // do nothing
  }
}

if ('when add subcommand to MyCommand then return type is not MyCommand (limitation)') {
  const myProgram = new MyCommand();
  const mySub = myProgram.command('sub');
  // Breaking: lost automatic custom typing of subcommands
  // @ts-expect-error 
  mySub.myFunction();
}

if ('when call chaining method using inference on MyCommand then return type not MyCommand (limitation)') {
  new MyCommand().myFunction();
  // Breaking: lost subclass when chain
  // @ts-expect-error 
  new MyCommand().opts('-f').myFunction();
}

if ('when add option to MyCommand then option type inferred') {
  const program = new MyCommand()
    .option('-f, --foo', 'foo description');
  const foo = program.opts().foo;
  expectType<true | undefined>(foo);
}

if ('when add MyOption to Command then option type inferred') {
  const program = new Command()
    .addOption(new MyOption('-f, --foo <value>', 'foo description').makeOptionMandatory());
  const foo = program.opts().foo;
  expectType<string>(foo);
}

if ('when call chaining method using inference on MyOption then return type not MyOption (limitation)') {
  new MyOption('-f, --foo').myFunction();
  // Breaking: lost subclass when chain
  // @ts-expect-error 
  new MyOption('-f, --foo').default(3).myFunction();
}
