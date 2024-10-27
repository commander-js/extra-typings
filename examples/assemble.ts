import { createProgram, type ProgramOpts } from './assemble-program';
import { createSub, type SubOpts } from './assemble-sub';

// Example of strongly typed globals in a subcommand which is added to program using .addCommand().

export function AssembleProgram() {
  const program = createProgram();
  const subCommand = createSub();
  program.addCommand(subCommand);
  return program;
}
