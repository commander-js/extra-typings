import { expectType } from 'tsd';
import { Command, createOption } from '..';

// Doing end-to-end test, rather than checking created Option directly.

if ('when cmd.createOption with boolean then type is boolean') {
  const program = new Command();
  const foo = program
    .addOption(program.createOption('-f, --foo', 'decription'))
    .opts()
    .foo;
  expectType<true | undefined>(foo);
}

if ('when cmd.createOption with required option-argument then type is string') {
  const program = new Command();
  const foo = program
    .addOption(program.createOption('-f, --foo <value>', 'decription'))
    .opts()
    .foo;
  expectType<string | undefined>(foo);
}

if ('when cmd.createOption with optional option-argument then type is string|true') {
  const program = new Command();
  const foo = program
    .addOption(program.createOption('-f, --foo [value]', 'decription'))
    .opts()
    .foo;
  expectType<string | true | undefined>(foo);
}

if ('when global createOption with boolean then type is boolean') {
  const program = new Command();
  const foo = program
    .addOption(createOption('-f, --foo', 'decription'))
    .opts()
    .foo;
  expectType<true | undefined>(foo);
}

if ('when global createOption with required option-argument then type is string') {
  const program = new Command();
  const foo = program
    .addOption(createOption('-f, --foo <value>', 'decription'))
    .opts()
    .foo;
  expectType<string | undefined>(foo);
}

if ('when global createOption with optional option-argument then type is string|true') {
  const program = new Command();
  const foo = program
    .addOption(createOption('-f, --foo [value]', 'decription'))
    .opts()
    .foo;
  expectType<string | true | undefined>(foo);
}
