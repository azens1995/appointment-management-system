# Appointment Management System

Appointment Management System is a project build upon the Node and Typescript.

The main purpose of this project is to create the playground for the unit testing learning.

## Tech Stack

1. Typescript
2. Node
3. Express
4. PostgreSQL
5. Prisma (ORM)

## Features

1. User Registration and Login
2. Appointment Add, Read, Update, Delete
3. Unit testing

## Installation and Running

1. Clone the repo.
2. Install the dependencies by running `npm install`.
3. Run `npm run prisma:migrate` to migrate schema.
4. Run `npm run prisma:generate` to install prisma client.

`npm run start:dev` start the server in development mode.
`npm run test:dev` to start Jest testing

## Database Migration and Setting

1. Run `npm run prisma:migrate` to migrate the prisma.schema.
2. Run `npm run prisma:generate` to update the prisma client with latest changes so that you get typechecking for latest changes to your schema.

Every time you make changes to `prisma/schema.prisma` make sure to run above commands.

For seeding run `npm run prisma:seed`

## Challenges

The application architecture follows the following structure:

- Route
- Controller
- Service
- Repository

For the unit testing, one can begin mocking and spying the PrismaClient to test the repository layer.

1. For repository layer testing, it is recommended to use the jest-mock to mock the PrismaClient.

2. For Service layer testing, it is recommended to use the Jest/SinonJS for mocking and spying.

3. For API testing, it is recommended to use supertest.
