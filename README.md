# extra-typings for commander

This package offer experimental TypeScript typings for `commander` which infer strong types for:

- all the parameters of the action handler, including the options
- options returnsed by `.opts()`

Limitations

- subclassing is not directly supported for `Command`, `Argument`, or `Option`

Usage

- install `@commander-js/extra-typings` using your preferred package manager
- install `commander`, if not already installed (peer dependency)
- in code import from `@commander-js/extra-typings` instead of `commander`

The runtime is supplied by commander.
