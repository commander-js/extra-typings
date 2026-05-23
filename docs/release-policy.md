# Release Policy

The version numbering does not follow semantic versioning but instead aligns with the `commander` version number. The installed version of this package should match the major and minor version numbers of the installed commander package, but the patch version number is independent (following pattern used by [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped#how-do-definitely-typed-package-versions-relate-to-versions-of-the-corresponding-library)).

The release notes for major versions highlight breaking changes, and include a section of migration tips for common changes required.
The [changelog](../CHANGELOG.md) lists release notes for all versions.

The current release line gets all updates: features, bug fixes, and security updates. Older maintenance versions get just security updates for 12 months.

| Version | First Release | Release Note |  Status | End of Life |
| ------- | ------------- | - | ------- | ----------- |
| 15.x | 2026-05-29 | [15.0.0](https://github.com/commander-js/extra-typings/releases/tag/v15.0.0) | current | - |
| 14.x | 2025-05-18 | [14.0.0](https://github.com/commander-js/extra-typings/releases/tag/v14.0.0) | maintenance | 2027-05-29 |
| <14 | | | end of life | |
