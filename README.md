<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Project Overview:
### Note: This is a single user app with no authentication. It is not intended for production use. It is a learning exercise only.

The API allows user to access video lessons online to make notes about specific parts of the lesson. Also it allow user to answer quizzes regarding lessons and provide a report with a summary of use.

For implementing new features is recommended to follow the [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices), DRY, KISS and SOLID principles.

## Project Structure:

This is a monolithic NestJS project with the following modules:
- Bookmarks module - allows user to create and read bookmarks
- Lessons module - manages lessons, lessons topics and reports on lessons
- Quizzes module - manages quizzes and quiz questions
- Shared  - contains shared code and services
  - Database module - manages database connection for easily switching between databases
  - Config module - manages configuration for easily switching between environments
  - Stream module - manages streaming of video files

## Dependencies:

Been added to the project the following dependencies: TypeORM, Swagger, ClassValidator, ClassTransformer, SQLite, CacheManager

## Setup Instructions:

### Getting started
1. Clone the repo
1. Run `npm i` to install project dependencies
1. Run `nest start --watch` to start the server

## Configuration:

All configuration variables are stored in the `.env` file. This file is not committed to source control. Instead, a `.env.local` file is provided as a template for developers to create their own `.env` file.
Example .env.local:
```
NODE_ENV=
PORT=
DB_DATABASE=
```

## Usage Examples:

All API endpoints are documented using Swagger. To view the Swagger documentation, start the server and navigate to `http://localhost:3000/api`.

Also, you can check the `docs` folder in the root of the project to view the diagrams of few endpoints.

## Testing:

For testing, the following dependencies have been added: Jest, Supertest NestJS Testing
To run the tests, run `npm run test`

## License

Nest is [MIT licensed](LICENSE).
