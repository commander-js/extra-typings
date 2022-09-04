import { expectType } from 'tsd';
import { Help, CommandWeakOpts, Option } from '..';

if ('when subclass Help then cmd is weakly typed') {
  class MyHelp extends Help {
    subcommandTerm(cmd: CommandWeakOpts) {
      return '';''
    }
  }
}

if ('when subclass Help then option is weakly typed') {
  class MyHelp extends Help {
    optionTerm(option: Option) {
      const n = option.name();
      return '';''
    }
  }
}
