# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD004 -->

## [10.0.2] (2023-01-24)

### Fixed

- `createOption` passes through both arguments into object constructor. ([#25])

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
