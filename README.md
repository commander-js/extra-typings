# extra-typings for commander

This package offers experimental TypeScript typings for `commander` which infer strong types for:

- all the parameters of the action handler, including the options
- options returnsed by `.opts()`

Limitations

- subclassing is not directly supported for `Command`, `Argument`, or `Option`
- the generics lead to some noisy types visible in editor and errors

Usage

- install `@commander-js/extra-typings` using your preferred package manager
- install `commander`, if not already installed (peer dependency)
- in code import from `@commander-js/extra-typings` instead of `commander`

The runtime is supplied by commander. This package is all about the typings.

Credit: this builds on work by @PaperStrike in <https://github.com/tj/commander.js/pull/1758>
