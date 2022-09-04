import { expectType } from 'tsd';
import { Help, CommandWeakOpts } from '..';

if ('when subclass Help then cmd is weakly typed') {
  class MyHelp extends Help {
    subcommandTerm(cmd: CommandWeakOpts) {
      return '';''
    }
  }
}
