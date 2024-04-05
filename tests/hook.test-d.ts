import { expectType } from 'tsd';
import { Command } from '..';

if ('when add preAction hook then thisCommand strongly typed') {
  const program = new Command()
    .option('-f, --foo <value>')
    .hook('preAction', (thisCommand, actionCommand) => {
      const o = thisCommand.opts().foo;
      expectType<string | undefined>(o);
    });
}

if ('when add preAction hook then activeCommand strongly typed') {
  const program = new Command()
    .option('-f, --foo <value>')
    .hook('preAction', (thisCommand, activeCommand) => {
      const o = activeCommand.opts().foo;
      expectType<unknown>(o);
    });
}

if ('when add postAction hook then thisCommand strongly typed') {
  const program = new Command()
    .option('-f, --foo <value>')
    .hook('postAction', (thisCommand, actionCommand) => {
      const o = thisCommand.opts().foo;
      expectType<string | undefined>(o);
    });
}

if ('when add postAction hook then activeCommand strongly typed') {
  const program = new Command()
    .option('-f, --foo <value>')
    .hook('postAction', (thisCommand, activeCommand) => {
      const o = activeCommand.opts().foo;
      expectType<unknown>(o);
    });
}

if ('when add preSubcommand hook then thisCommand strongly typed') {
  const program = new Command()
    .option('-f, --foo <value>')
    .hook('preSubcommand', (thisCommand, actionCommand) => {
      const o = thisCommand.opts().foo;
      expectType<string | undefined>(o);
    });
}

if ('when add preSubcommand hook then activeCommand strongly typed') {
  const program = new Command()
    .option('-f, --foo <value>')
    .hook('preSubcommand', (thisCommand, activeCommand) => {
      const o = activeCommand.opts().foo;
      expectType<unknown>(o);
    });
}
