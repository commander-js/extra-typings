# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

The version numbering does not follow semantic versioning but instead aligns with the `commander` version number. The installed version of this package should match the major and minor version numbers of the installed commander package, but the patch version number is independent (following pattern used by [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped#how-do-definitely-typed-package-versions-relate-to-versions-of-the-corresponding-library)).

<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD004 -->

## [14.0.0] (2025-05-18)

### Added

- support for groups of options and commands in the help using low-level `.helpGroup()` on `Option` and `Command`, and higher-level `.optionsGroup()` and `.commandsGroup()` which can be used in chaining way to specify group title for following options/commands ([#100])
- TypeScript: add `parseArg` property to `Argument` class ([#93])

### Changed

- *Breaking:* peer dependency on Commander 14.0.x which requires Node.js 20 or higher
- internal refactor of `Help` class adding `.formatItemList()` and `.groupItems()` methods ([#93])

## [13.1.0] (2025-01-25)

## Changed

- peer dependency on Commander 13.1.x
- update dependencies

## [13.0.0] (2024-12-31)

### Added

- strongly type `.optsWithGlobals()` to include inferred globals ([#78])
- weakly type `.getOptionValueSourceWithGlobals()` to include inferred globals ([#78])
- infer narrow types for choices, so no longer need to specify as `const` ([#79])

### Changed

- *Breaking:* Typescript 5.0 or higher is required ([#79])

## [13.0.0-1] (2024-12-08)

(Released in 13.0.0)

## 13.0.0-0 (2024-12-08) [YANKED]

Published from wrong branch.

## [12.1.0] (2024-05-18)

### Changed

- use ESLint for linting ([#65])
- format source files with Prettier ([#66])

### Removed

- removed unimplemented Option.fullDescription from TypeScript definition ([#70])

## [12.0.1] (2023-03-02)

### Changed

- include implicit `this` in parameters for action handler callback [#59]

## [12.0.0] (2023-02-04)

### Changed

- update `peerDependencies` to `commander@12.0.x`, which requires Node.js v18 or higher

## [12.0.0-1] (2023-11-13)

### Fixed

- use prerelease Commander version for peerDependencies

## [12.0.0-0] (2023-11-12)

### Changed

- update `peerDependencies` to `commander@12.0.x`, which requires Node.js v18 or higher

## [11.1.0] (2023-10-15)

### Added

- `Option` properties: `envVar`, `presetArg` ([#48])
- `Argument` properties: `argChoices`, `defaultValue`, `defaultValueDescription` ([#48])
- `Command` properties: `options`, `registeredArguments` ([#50])

### Changed

- `commands` property of `Command` is now readonly ([#48])
- update `peerDependencies` to `commander@11.1.x` ([#48])

### Fixed

- remove unused `Option.optionFlags` property ([#48])
- add that `Command.version()` can also be used as getter ([#48])
- add null return type to `Commands.executableDir()`, for when not configured ([#48])
- preserve option typings when adding arguments to `Command` ([#49])

## [11.0.0] (2023-06-16)

### Changed

- update `peerDependencies` to `commander@11.0.x`, which requires Node.js v16 or higher

## [10.0.3] (2023-03-03)

### Added

- narrow types based on `.choices()` ([#29])

### Fixed

- improve Option type inferences for certain combinations of configuration ([#31])
- mark `.action()` callback as allowing promises ([#33])

## [10.0.2] (2023-01-27)

### Fixed

- `createOption` passes through description into object constructor. ([#25])

## [10.0.1] (2023-01-17)

### Fixed

- `createCommand`, `createArgument`, and `createOption` pass through arguments into object constructors. ([#23])

## [10.0.0] (2023-01-14)

### Changed

- update `peerDependencies` to `commander@10.0.x`, which requires Node.js v14 or higher

## [9.5.0] (2023-01-07)

### Added

- `.getOptionValueSourceWithGlobals()` ([#18])
- `showGlobalOptions` for `.configureHelp{}` and `Help` ([#19])

### Changed

- update `peerDependencies` to `commander@9.5.x`

## [9.4.1] (2022-11-01)

### Fixed

- added `esm.mjs` to package ([#16])

## [9.4.0] (2022-10-28)

### Added

- type `processedArgs`
- infer types from `.createOption()`
- infer types from `.createArgument()`

### Changed

- update `peerDependencies` to `commander@9.4.x`

## [0.3.0] (2022-09-07)

### Added

- add `CommandUnknownOpts` for when Command not strongly typed
- use `CommandUnknownOpts` throughout Help, so can pass in commands which are `Command` or `CommandUnknownOpts`
- use `CommandUnknownOpts` with `addCommand`
- type `.hook()` arguments
- add inferred option names and types to `.getOptionValue()`, but allow unknown and return `unknown`
- add `implied` to `OptionValueSource`

### Changed

- switch `OptionValues` to returning unknown (goodbye another any!)
- allow user defined source on get and set

## [0.2.0] (2022-08-23)

### Fixed

- a missing variadic optional command-line argument should be `[]` not `undefined`

### Changed

- use simple array type rather than fancy non-empty tuple, like `string[]` rather than `[string, ...string[]]`

## 0.1.0 (2022-08-16)

### Added

- infer types from
  - `.argument()`
  - `.arguments()`
  - `.addArgument()`
  - `.command()`
  - `.option()`
  - `.addOption()`
- inferred types for `.action()`
- inferred types for `.opts()`

[14.0.0]: https://github.com/commander-js/extra-typings/compare/v13.1.0...v14.0.0
[13.1.0]: https://github.com/commander-js/extra-typings/compare/v13.0.0...v13.1.0
[13.0.0]: https://github.com/commander-js/extra-typings/compare/v12.1.0...v13.0.0
[13.0.0-1]: https://github.com/commander-js/extra-typings/compare/v12.1.0...v13.0.0-1
[12.1.0]: https://github.com/commander-js/extra-typings/compare/v12.0.1...v12.1.0
[12.0.1]: https://github.com/commander-js/extra-typings/compare/v12.0.0...v12.0.1
[12.0.0]: https://github.com/commander-js/extra-typings/compare/v11.0.0...v12.0.0
[12.0.0-1]: https://github.com/commander-js/extra-typings/compare/v12.0.0-0...v12.0.0-1
[12.0.0-0]: https://github.com/commander-js/extra-typings/compare/v11.1.0...v12.0.0-0
[11.1.0]: https://github.com/commander-js/extra-typings/compare/v11.0.0...v11.1.0
[11.0.0]: https://github.com/commander-js/extra-typings/compare/v10.0.3...v11.0.0
[10.0.3]: https://github.com/commander-js/extra-typings/compare/v10.0.2...v10.0.3
[10.0.2]: https://github.com/commander-js/extra-typings/compare/v10.0.1...v10.0.2
[10.0.1]: https://github.com/commander-js/extra-typings/compare/v10.0.0...v10.0.1
[10.0.0]: https://github.com/commander-js/extra-typings/compare/v9.5.0...v10.0.0
[9.5.0]: https://github.com/commander-js/extra-typings/compare/v9.4.1...v9.5.0
[9.4.1]: https://github.com/commander-js/extra-typings/compare/v9.4.0...v9.4.1
[9.4.0]: https://github.com/commander-js/extra-typings/compare/v0.3.0...v9.4.0
[0.3.0]: https://github.com/commander-js/extra-typings/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/commander-js/extra-typings/compare/v0.1.0...v0.2.0

[#16]: https://github.com/commander-js/extra-typings/pull/16
[#18]: https://github.com/commander-js/extra-typings/pull/18
[#19]: https://github.com/commander-js/extra-typings/pull/19
[#23]: https://github.com/commander-js/extra-typings/pull/23
[#25]: https://github.com/commander-js/extra-typings/pull/25
[#29]: https://github.com/commander-js/extra-typings/pull/29
[#31]: https://github.com/commander-js/extra-typings/pull/31
[#33]: https://github.com/commander-js/extra-typings/pull/33
[#48]: https://github.com/commander-js/extra-typings/pull/48
[#49]: https://github.com/commander-js/extra-typings/pull/49
[#50]: https://github.com/commander-js/extra-typings/pull/50
[#59]: https://github.com/commander-js/extra-typings/pull/59
[#65]: https://github.com/commander-js/extra-typings/pull/65
[#66]: https://github.com/commander-js/extra-typings/pull/66
[#70]: https://github.com/commander-js/extra-typings/pull/70
[#78]: https://github.com/commander-js/extra-typings/pull/78
[#79]: https://github.com/commander-js/extra-typings/pull/79
[#93]: https://github.com/commander-js/extra-typings/pull/93
[#100]: https://github.com/commander-js/extra-typings/pull/100
