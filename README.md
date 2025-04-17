# Codebase Documentation

## Overview

This project is a **Turborepo monorepo** setup for a full-stack TypeScript application, managed with `pnpm` and designed for scalable, modular development. It contains multiple apps and shared packages, using modern tools like Next.js, Express, TypeScript, ESLint, and Prettier.

---

## Monorepo Structure

- **apps/**
  - **server/**: Backend Express server (TypeScript, Node.js, MongoDB, Redis, BullMQ for queues, etc.)
  - **web/**: Frontend Next.js app (React, Next.js, TailwindCSS, NextAuth, Recharts, etc.)

- **packages/**
  - **eslint-config/**: Shared ESLint configuration for monorepo (supports Next.js, React, Prettier).
  - **typescript-config/**: Shared TypeScript configuration presets.

- **Other Root Files**
  - README.md: Project guide and instructions.
  - package.json: Monorepo scripts and dev dependencies.
  - pnpm-workspace.yaml: Declares workspace packages.
  - turbo.json: Turborepo pipeline config.
  - .gitignore, .npmrc: Standard config files.

---

## Key Technologies

- **Monorepo Management**: Turborepo, pnpm
- **Frontend**: Next.js, React, TailwindCSS, NextAuth, Recharts
- **Backend**: Express, Mongoose (MongoDB), BullMQ (Redis), Node-cron, Axios
- **TypeScript**: Used throughout all apps and packages
- **Linting/Formatting**: ESLint, Prettier, custom config packages
- **Build Tools**: Turbo, TypeScript, Node.js

---

## Development & Build

- **Develop all apps/packages**:  
  ```sh
  pnpm dev
  ```
- **Build all apps/packages**:  
  ```sh
  pnpm build
  ```
- **Linting**:  
  ```sh
  pnpm lint
  ```
- **Type Checking**:  
  ```sh
  pnpm check-types
  ```

---

## Apps

### 1. `apps/server`
- **Type**: Node.js Express server
- **Main Tools**: Express, Mongoose, BullMQ, ioredis, node-cron, dotenv, axios
- **Scripts**: `dev`, `build`, `start`, `watch`
- **Config**: TypeScript (tsconfig.json), environment variables (.env)

### 2. `apps/web`
- **Type**: Next.js frontend app
- **Main Tools**: React, Next.js, TailwindCSS, NextAuth, Recharts, Axios
- **Scripts**: `dev`, `build`, `start`, `lint`, `check-types`
- **Config**: Next.js, TypeScript, TailwindCSS, PostCSS, environment variables

---

## Packages

### 1. `packages/eslint-config`
- **Purpose**: Shared ESLint rules for all monorepo projects
- **Exports**: Base, Next.js, React-internal configs

### 2. `packages/typescript-config`
- **Purpose**: Shared TypeScript configuration presets for apps and packages

---

## Utilities

- **TypeScript**: Static type checking everywhere
- **ESLint**: Linting with shared config
- **Prettier**: Code formatting
- **Turbo**: Fast builds and caching

---

## Remote Caching

- **Supported**: Via Vercel/Turborepo for faster CI and team development

---

## How to Extend

- Add new apps in `apps/`
- Add new shared packages in `packages/`
- Use shared configs for TypeScript and ESLint for consistency

---

## Next Steps

If you want detailed documentation for any specific app, package, or configuration, or a deeper dive into the source code (like API endpoints, React components, etc.), let me know which part you want to focus on!

---

**Summary:**  
This monorepo is a modern, scalable setup for developing full-stack TypeScript applications with shared tooling and configuration, supporting both backend and frontend projects in a unified workspace.



## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/docs/reference/configuration)
- [CLI Usage](https://turbo.build/docs/reference/command-line-reference)
