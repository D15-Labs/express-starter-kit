# Contributing to Express Starter Kit

Thank you for your interest in contributing to the Express Starter Kit! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Code of Conduct](#code-of-conduct)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18+ (check `.tool-versions` for the exact version)
- **pnpm**: Package manager (recommended)
- **PostgreSQL**: Version 15+ (for database features)
- **Git**: Version control system

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/express-starter-kit.git
   cd express-starter-kit
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/D15-Labs/express-starter-kit.git
   ```

## Development Setup

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.template .env
   # Edit .env with your configuration
   ```

3. Set up the database:

   ```bash
   # Install PostgreSQL and create a database
   createdb express_starter

   # Run database migrations
   pnpm migrate
   ```

### Running the Application

- **Development mode**: `pnpm dev`
- **Production build**: `pnpm build`
- **Run tests**: `pnpm test`
- **Database migrations**:
  - Run all pending migrations: `pnpm migrate`
  - Rollback last migration: `pnpm migrate:down`
  - Create new migration: `pnpm migrate:create <migration-name>`
- **Lint code**: `pnpm check`
- **Format code**: `pnpm check`

## Code Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow the existing code style (enforced by Biome)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Prefer `const` over `let`, avoid `var`

### Import Organization

- Use the `@` alias for imports within the `src` directory
- Group imports: external libraries first, then internal modules
- Remove unused imports

Example:

```typescript
import express from "express";
import { z } from "zod";

import { env } from "@/common/utils/envConfig";
import { userRouter } from "@/api/user/userRouter";
```

### File Structure

- Keep files small and focused on a single responsibility
- Use kebab-case for file names (e.g., `user-service.ts`)
- Group related files in directories
- Follow the existing project structure

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

- Write tests for all new features and bug fixes
- Use descriptive test names that explain the expected behavior
- Follow the existing test patterns (Vitest + Supertest)
- Aim for good test coverage

Example test structure:

```typescript
describe("User Service", () => {
  describe("getUserById", () => {
    it("should return user when found", async () => {
      // Test implementation
    });

    it("should return null when user not found", async () => {
      // Test implementation
    });
  });
});
```

## Commit Conventions

This project uses [Conventional Commits](https://conventionalcommits.org/) to ensure consistent and meaningful commit messages. All commits are automatically validated using Husky and Commitlint.

### Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
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
- `test: add unit tests for user service`

### Validation

Commits that don't follow the conventional format will be rejected. This ensures clean git history and enables automatic changelog generation.

## Pull Request Process

1. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code standards

3. **Write tests** for your changes

4. **Run the full test suite**:

   ```bash
   pnpm test
   pnpm lint
   ```

5. **Update documentation** if needed (README, API docs, etc.)

6. **Commit your changes** using conventional commit format

7. **Push your branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request** on GitHub:
   - Use a clear, descriptive title
   - Provide a detailed description of the changes
   - Reference any related issues
   - Ensure all CI checks pass

9. **Address review feedback** and make necessary changes

10. **Merge** once approved

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Provide clear descriptions of what the PR does
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation as needed
- Follow the existing code patterns

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs. actual behavior
- **Environment details** (OS, Node version, etc.)
- **Error messages** or stack traces
- **Screenshots** if applicable

### Feature Requests

For feature requests, please include:

- **Clear description** of the proposed feature
- **Use case** or problem it solves
- **Proposed implementation** if you have ideas
- **Alternatives considered**

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

### Unacceptable Behavior

- Harassment or discrimination
- Offensive language or content
- Personal attacks
- Trolling or disruptive behavior
- Spam or irrelevant content

Violations of the code of conduct may result in temporary or permanent bans from the project.

## Getting Help

If you need help or have questions:

- Check the [README.md](README.md) for setup and usage instructions
- Search existing issues and discussions
- Create a new discussion for questions
- Join our community chat (if available)

Thank you for contributing to the Express Starter Kit! Your contributions help make this project better for everyone. 🚀
