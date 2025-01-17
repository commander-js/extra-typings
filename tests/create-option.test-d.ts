import { expectType } from 'tsd';
import { Command, createOption } from '..';

// Doing end-to-end test, rather than checking created Option directly.

// 'when cmd.createOption with boolean then type is boolean'
{
  const program = new Command();
  const foo = program
    .addOption(program.createOption('-f, --foo', 'decription'))
    .opts().foo;
  expectType<true | undefined>(foo);
}

// 'when cmd.createOption with required option-argument then type is string'
{
  const program = new Command();
  const foo = program
    .addOption(program.createOption('-f, --foo <value>', 'decription'))
    .opts().foo;
  expectType<string | undefined>(foo);
}

// 'when cmd.createOption with optional option-argument then type is string|true'
{
  const program = new Command();
  const foo = program
    .addOption(program.createOption('-f, --foo [value]', 'decription'))
    .opts().foo;
  expectType<string | true | undefined>(foo);
}

// 'when global createOption with boolean then type is boolean'
{
  const program = new Command();
  const foo = program
    .addOption(createOption('-f, --foo', 'decription'))
    .opts().foo;
  expectType<true | undefined>(foo);
}

// 'when global createOption with required option-argument then type is string'
{
  const program = new Command();
  const foo = program
    .addOption(createOption('-f, --foo <value>', 'decription'))
    .opts().foo;
  expectType<string | undefined>(foo);
}

// 'when global createOption with optional option-argument then type is string|true'
{
  const program = new Command();
  const foo = program
    .addOption(createOption('-f, --foo [value]', 'decription'))
    .opts().foo;
  expectType<string | true | undefined>(foo);
}

// 'when global createOption with const choices then type is string union'
{
  const program = new Command();
  const foo = program
    .addOption(
      createOption('-f, --foo <value>', 'description').choices(['A', 'B', 'C']),
    )
    .opts().foo;
  expectType<'A' | 'B' | 'C' | undefined>(foo);
}

// 'when global createOption with variadic and const choices then type is string union array'
{
  const program = new Command();
  const foo = program
    .addOption(
      createOption('-f, --foo <value...>', 'description')
        .choices(['A', 'B', 'C'])
        .makeOptionMandatory(),
    )
    .opts().foo;
  expectType<('A' | 'B' | 'C')[]>(foo);
}
