# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-02-05

### Added

- **CHANGELOG.md**: Added this changelog file to track project changes

### Changed

- **Node.js**: Updated from v20.19.4 to v24.13.0 LTS for latest features and security updates
- **TypeScript Configuration**: Updated to industry best practices
  - Changed `module` from `"Node16"` to `"NodeNext"` for future-proof module resolution
  - Changed `moduleResolution` from `"node16"` to `"NodeNext"`
  - Changed `target` from `"ESNext"` to `"ES2023"` for more stable compilation

### Fixed

- **Express Parameter Handling**: Fixed route parameter type handling for Express v5 compatibility
- **Zod Error Messages**: Updated test expectations to match Zod v4 error message format
- **Module Resolution**: Resolved ESM module resolution issues with Node.js 24

### Technical Details

- **Dependencies Updated**: Updated multiple packages including Zod and related validation libraries
- **Database Migrations**: Renamed migration files to use `.mts` extension for ESM compatibility
- **Migration Triggers**: Updated trigger options from lowercase to uppercase for PostgreSQL compatibility
- **Build System**: Ensured compatibility with updated TypeScript and Node.js versions
- **Testing**: All 35 tests pass with new configuration

## [1.2.0] - 2025-12-19

### Added

- **User Module**: Complete user management system with CRUD operations and test coverage (#18)
- **Dependabot Configuration**: Automated dependency updates for better security maintenance (#3)

### Changed

- **Database Integration**: Decoupled from Drizzle ORM and moved to direct PostgreSQL with pg-promise (#1)
- **Dependencies**: Major version updates for better performance and security
  - Updated `pino` from 9.9.0 to 10.3.0 (#16)
  - Updated `vite-tsconfig-paths` from 5.1.4 to 6.0.5 (#15)
  - Updated `zod` and `@asteasolutions/zod-to-openapi` (#22)

### Removed

- **express-rate-limit**: Removed rate limiting dependency and related middleware

### Fixed

- **Security Vulnerability**: Resolved critical security vulnerability in form-data package

## [1.1.0] - 2025-11-XX

### Added

- **API Documentation**: OpenAPI/Swagger documentation generation
- **Health Check Endpoints**: System health monitoring
- **Request Logging**: Comprehensive request/response logging with Pino
- **Error Handling**: Centralized error handling middleware
- **Docker Support**: Containerization with Dockerfile
- **Biome**: Code quality and formatting tooling
- **Vitest**: Modern testing framework with 35+ test cases

### Changed

- **Project Structure**: Reorganized from api/ to modules/ folder structure
- **Environment Configuration**: Simplified with BASE_URL support
- **Dependencies**: Updated to latest versions

### Technical Details

- **Runtime**: Node.js 20.x LTS
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with pg-promise
- **Build System**: tsup for dual ESM/CJS output
- **Code Quality**: Biome for linting and formatting
