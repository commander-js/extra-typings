# extra-typings for commander

This package offers experimental TypeScript typings for `commander` which infer strong types for:

- all the parameters of the action handler, including the options
- options returned by `.opts()`

Limitations

- the generics lead to some noisy types visible in editor and errors
- some code changes for subclasses of `Command`, `Argument`, or `Option` (see [subclass.test-d.ts](./tests/subclass.test-d.ts))
  - chaining methods which do type inference return base class rather than `this`
  - subclass of `Command` returns base class not subclass from `.command(name)`
  - type parameter needed for class declaration of subclass of `Option` and `Argument`

Usage

- install `@commander-js/extra-typings` using your preferred package manager
- install `commander`, if not already installed (peer dependency)
- in code import from `@commander-js/extra-typings` instead of `commander`

The runtime is supplied by commander. This package is all about the typings.

Credit: this builds on work by @PaperStrike in <https://github.com/tj/commander.js/pull/1758>

## Usage tips

The types are built up as the options and arguments are defined. The usage pattern for action handlers is easy. Just chain the action handler after the options and arguments.

```js
import { program } from '@commander-js/extra-typings';

program.command('print')
  .argument('<file>')
  .option('--double-sided')
  .action((targetFile, options) => {
    // command-arguments and options are fully typed
  });
```

For working with a single command without an action handler, the configuration need to be done at the same time as the variable is declared.

```js
import { Command } from '@commander-js/extra-typings';

// broken pattern
const program = new Command(); // program type does not include options or arguments
program.option('-d, --debug'); // adding option does not change type of program
const options = program.opts(); // dumb type
```

```js
import { Command } from '@commander-js/extra-typings';

// working pattern
const program = new Command()
  .option('-d, --debug'); // program type includes chained options and arguments
const options = program.opts(); // smart type
```

