/* eslint-disable @typescript-eslint/no-empty-object-type */

// Example of strongly typed globals in a subcommand which is added to program using .addCommand().

import { Command } from '../index.js';
import { type ProgramOpts } from './assemble-program.js';

export function createSub() {
  const program = new Command<[], {}, ProgramOpts>('sub').option('-l, --local');
  const optsWithGlobals = program.optsWithGlobals();
  return program;
}

export type SubOpts = ReturnType<typeof createSub>['opts'];
