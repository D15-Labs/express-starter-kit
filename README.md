# Node Express SaaS Starter Kit

[![CI](https://github.com/D15-Labs/express-starter-kit/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/D15-Labs/express-starter-kit/actions/workflows/ci.yml)
[![GitHub stars](https://img.shields.io/github/stars/D15-Labs/express-starter-kit)](https://github.com/D15-Labs/express-starter-kit/stargazers)

```code
Hey There!
that star button if you like this boilerplate.
```

## Introduction

Welcome to Node Express SaaS Starter Kit – a simple and ready-to-use starting point for building backend web services with Express.js and TypeScript.

## Why We Made This

This starter kit helps you:

- Start new projects faster
- Write clean, consistent code
- Build things quickly
- Follow best practices for security and testing

## What's Included

- Well-organized folders: Files grouped by feature so you can find things easily
- Fast development: Quick code running with `tsx` and error checking with `tsc`
- Latest Node.js: Uses the newest stable Node.js version from `.tool-versions`
- Safe settings: Environment settings checked with Zod to prevent errors
- Short import paths: Clean code with easy imports using path shortcuts
- Auto-updates: Keeps dependencies up-to-date with Renovate
- Better security: Built-in protection with Helmet and CORS settings
- Easy tracking: Built-in logging with `pino-http`
- Ready-to-test: Testing tools with Vitest and Supertest already set up
- Clean code: Consistent coding style with `Biomejs`
- Standard responses: Unified API responses using `ServiceResponse`
- Easy deployment: Ready for Docker containers
- Input checking: Request validation using Zod
- API browser: Interactive API docs with Swagger UI
- Database ready: PostgreSQL integration with `pg-promise` for database operations
- Commit standards: Conventional commits enforced with Husky and Commitlint

## Conventional Commits

This project uses [Conventional Commits](https://conventionalcommits.org/) to ensure consistent and meaningful commit messages. All commits are automatically validated using Husky and Commitlint.

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples

- `feat: add user authentication`
- `fix(api): resolve user login issue`
- `docs: update README with setup instructions`
- `chore: update dependencies`

### Validation

Commits that don't follow the conventional format will be rejected. This ensures clean git history and enables automatic changelog generation.


## Getting Started

### Step-by-Step Guide

#### Step 1: Initial Setup

- Clone the repository: `git clone https://github.com/D15-Labs/express-starter-kit.git`
- Navigate: `cd express-starter-kit`
- Install dependencies: `pnpm install`

#### Step 2: Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 2.5: Database Setup

This project uses PostgreSQL as the database. The database connection is configured using `pg-promise`.

**Prerequisites:**

- PostgreSQL 15+ installed and running locally
- Database created for the application

**Database Configuration:**

- The `DATABASE_URL` in `.env` should use standard PostgreSQL connection string format:
  ```
  DATABASE_URL="postgres://username:password@localhost:5432/database_name"
  ```
- Example: `DATABASE_URL="postgres://d15labs@localhost:5432/express_starter"`

**Database Connection:**

- Database connection is established in `src/database/pgConnection.ts`
- Import and use the `db` instance in your services:

  ```typescript
  import { db } from "../database/pgConnection";

  // Example query
  const users = await db.any("SELECT * FROM users");
  ```

#### Step 3: Running the Project

- Development Mode: `pnpm start:dev`
- Building: `pnpm build`
- Production Mode: Set `NODE_ENV="production"` in `.env` then `pnpm build && pnpm start:prod`

## Credits

This starter kit is based on the original [Express TypeScript Boilerplate](https://github.com/edwinhern/express-typescript) by Edwin Hernandez. Check out the original project and support the creator!

## Feedback and Contributions

We'd love to hear your feedback and suggestions for further improvements. Feel free to contribute and join us in making backend development cleaner and faster!

Happy coding!
