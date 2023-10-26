# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- `macAddresses` has been renamed to `macAddress`
- `macAddress` no longer includes `00:00:00:00:00:00`
- `serialNumber` has been renamed to `serial`

## 1.2.0 - 2023-10-25

### Added

- Added `macAddresses` and `serialNumber` property to `sentinelone_agent`
- Use API v2.1

## 1.1.2 - 2023-06-16

### Added

- added the `lastSeenOn` property to `sentinelone_agents`

## 1.1.0 - 2023-01-09

### Removed

- removed the `licenseKey` property from `sentinelone_agents`

## 1.0.1 2021-11-11

- Move questions into open source repository

## 1.0.0 2021-11-08

- Upgrade to `@jupiterone/integration-sdk-*@^7.4.0`

## 0.4.2 2021-04-09

### Added

- Added additional properties to `sentinelone_agent`:

  - `function: 'anti-malware'`

## 0.4.0 2020-10-29

### Changed

- Upgrade SDK v4

## 0.3.0 2020-10-27

This release migrates to the new integration SDK.
