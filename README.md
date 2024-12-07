![logo](./webapp/public/logo.png)

_This application was build as an university project where the main requirement was to create an application that is based on a calendar._

# Intro

OSK-Car is an application for instructors and students doing their driving license.

The main goal for the application is to serve a calendar where both students ans instructors can synchronize their time and align with the lessons.

**Technologies used:**
- Frontend: React-router v7 (migrated from remix)
- Backend: Hono
- Communication: TRPC
- Db: PostgreSQL
- Auth: Clerk
- RBAC: Cerbos

# Setup

This application consists of two modules:
- webapp
- server

[Bun](https://bun.sh/) was used as a main package manager for this project - consider running the projects with this tool

## Before you start

The authentication is built around [Clerk](https://clerk.com/), if you would like to run the app yourself at first please create a Clerk project that suits your needs

This project also is based on `workspaces` so the first step you should do is to run the command:
```
bun install
```
in the root directory

## Running webapp

Go to the webapp project and run the command
```
bun install
```
Then make a copy of the `.env.empty` file, rename it to `.env` and fill in with the requested properties

That's it! Now you can run the project using
```
bun dev
```

## Running server

At first you need to setup the PostgreSQL database. When you are done you can go to the server project and run
```
bun install
```

up next you need to synchronize the database definition and seeds, please run
```
bun prisma db push
```
and
```
bun run migrate
```

You should also setup an instance of [Cerbos](https://www.cerbos.dev/) for RBAC, the rule definitions can be found in a directory `cerbos`.

Next, make a copy of the `.env.empty` file, rename it to `.env` and fill in with the requested properties

That's it! Now you can run the project using
```
bun dev
```


