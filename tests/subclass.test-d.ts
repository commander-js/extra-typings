import { expectType } from 'tsd';
import { Command, Option } from '..';

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

// 'when add subcommand to MyCommand then return type is not MyCommand (limitation)'
{
  const myProgram = new MyCommand();
  const mySub = myProgram.command('sub');
  // Breaking: lost automatic custom typing of subcommands
  // @ts-expect-error because lost subclass and so myFunction unknown
  mySub.myFunction();
}

// 'when call chaining method using inference on MyCommand then return type not MyCommand (limitation)'
{
  new MyCommand().myFunction();
  // Breaking: lost subclass when chain
  // @ts-expect-error because lost subclass and so myFunction unknown
  new MyCommand().option('-f').myFunction();
}

// 'when add option to MyCommand then option type inferred'
{
  const program = new MyCommand().option('-f, --foo', 'foo description');
  const foo = program.opts().foo;
  expectType<true | undefined>(foo);
}

// 'when add MyOption to Command then option type inferred'
{
  const program = new Command().addOption(
    new MyOption('-f, --foo <value>', 'foo description').makeOptionMandatory(),
  );
  const foo = program.opts().foo;
  expectType<string>(foo);
}

// 'when call chaining method using inference on MyOption then return type not MyOption (limitation)'
{
  new MyOption('-f, --foo').myFunction();
  // Breaking: lost subclass when chain
  // @ts-expect-error because lost subclass and so myFunction unknown
  new MyOption('-f, --foo').default(3).myFunction();
}
