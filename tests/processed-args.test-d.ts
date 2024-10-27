import { expectType } from 'tsd';
import { Command } from '..';

// Doing a subset of the full tests in arguments.test-d.ts

// 'when no arguments then empty array'
{
  const program = new Command();
  const args = program.parse().processedArgs;
  expectType<[]>(args);
}

// 'when required argument then string element'
{
  const program = new Command();
  const args = program.argument('<value>').parse().processedArgs;
  expectType<[string]>(args);
}

// 'when optional argument then string|undefined element'
{
  const program = new Command();
  const args = program.argument('[value]').parse().processedArgs;
  expectType<[string | undefined]>(args);
}

// 'when variadic argument then string[] element'
{
  const program = new Command();
  const args = program.argument('<value...>').parse().processedArgs;
  expectType<[string[]]>(args);
}

// 'when multiple arguments then multiple elements'
{
  const program = new Command();
  const args = program
    .argument('<value>')
    .argument('[value]')
    .parse().processedArgs;
  expectType<[string, string | undefined]>(args);
}

// 'when custom argument processing then custom type'
{
  const program = new Command();
  const args = program
    .argument('<value>', 'description', parseFloat)
    .parse().processedArgs;
  expectType<[number]>(args);
}
