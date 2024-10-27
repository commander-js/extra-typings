import { Command } from '../index.js';

// Example of strongly typed globals in a subcommand which is added to program using .addCommand().
// Declare factory function for root Command in separate file from adding subcommands to avoid circular dependencies.

export function createProgram() {
  const program = new Command().option('-g, --global');
  return program;
}

export type ProgramOpts = ReturnType<ReturnType<typeof createProgram>['opts']>;
