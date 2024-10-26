import { expectType } from 'tsd';
import { Command, createArgument } from '..';

// Doing end-to-end test, rather than checking created Argument directly.

// 'when cmd.createArgument with required then type is string'
{
  const program = new Command();
  program.addArgument(program.createArgument('<value>')).action((arg) => {
    expectType<string>(arg);
  });
}

// ('when cmd.createArgument with optional then type is string|undefined'
{
  const program = new Command();
  program.addArgument(program.createArgument('[value]')).action((arg) => {
    expectType<string | undefined>(arg);
  });
}

// 'when cmd.createArgument with variadic then type is string[]'
{
  const program = new Command();
  program.addArgument(program.createArgument('<value...>')).action((arg) => {
    expectType<string[]>(arg);
  });
}

// 'when global createArgument with required then type is string'
{
  const program = new Command();
  program.addArgument(createArgument('<value>')).action((arg) => {
    expectType<string>(arg);
  });
}

// 'when global createArgument with optional then type is string|undefined'
{
  const program = new Command();
  program.addArgument(createArgument('[value]')).action((arg) => {
    expectType<string | undefined>(arg);
  });
}

// 'when global createArgument with variadic then type is string[]'
{
  const program = new Command();
  program.addArgument(createArgument('<value...>')).action((arg) => {
    expectType<string[]>(arg);
  });
}

// 'when global createArgument with const choices then type is string union'
{
  const program = new Command();
  program
    .addArgument(createArgument('<value>').choices(['A', 'B', 'C'] as const))
    .action((arg) => {
      expectType<'A' | 'B' | 'C'>(arg);
    });
}

// 'when global createArgument with variadic and const choices then type is array of string union'
{
  const program = new Command();
  program
    .addArgument(createArgument('<value...>').choices(['A', 'B', 'C'] as const))
    .action((arg) => {
      expectType<('A' | 'B' | 'C')[]>(arg);
    });
}
