import { expectType } from 'tsd';
import { Command } from '..';

// Doing a subset of the full tests in arguments.test-d.ts

if ('when no arguments then empty array') {
  const program = new Command();
  const args = program
    .parse()
    .processedArgs;
  expectType<[]>(args);
}

if ('when required argument then string element') {
  const program = new Command();
  const args = program
    .argument('<value>')
    .parse()
    .processedArgs;
  expectType<[string]>(args);
}

if ('when optional argument then string|undefined element') {
  const program = new Command();
  const args = program
    .argument('[value]')
    .parse()
    .processedArgs;
  expectType<[string| undefined]>(args);
}

if ('when variadic argument then string[] element') {
  const program = new Command();
  const args = program
    .argument('<value...>')
    .parse()
    .processedArgs;
  expectType<[string[]]>(args);
}

if ('when multiple arguments then multiple elements') {
  const program = new Command();
  const args = program
    .argument('<value>')
    .argument('[value]')
    .parse()
    .processedArgs;
  expectType<[string, string | undefined]>(args);
}

if ('when custom argument processing then custom type') {
  const program = new Command();
  const args = program
    .argument('<value>', 'description', parseFloat)
    .parse()
    .processedArgs;
  expectType<[number]>(args);
}
