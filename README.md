# crud-sequelize

## Introduction
This project is a CRUD-like example project with [Sequelize](https://github.com/sequelize/sequelize) and [Typescript](https://www.typescriptlang.org/). You can use this project to learn more about or something else, it's completely free after all :).

## Prerequisites

You must have installed the follow tools:
* [NodeJS](https://nodejs.org/en/).
* [PostgreSQL](https://www.postgresql.org/) (or some else popular DBMS).

## Installing
The first thing that you must do after forking and clonning this project is install the dependencies with the command

    $ npm install

After it, you must start your DBMS server and create a database with the name that you have put on `crud-sequelize/.env`, I strongly recommend you to put all environment constants (like port-number, database config data, etc.) on `.env` file, your `.env` file must looks like this:

```lang-none
DEBUG=true
JWTKEY=<your-secret-key>
PORT=3000

DB_HOST=localhost
DB_NAME=<your-db-name>
DB_PORT=<your-db-server-port-number>
DB_USER=<your-db-user-name>
DB_PASS=<your-db-user-password>
DB_DRIVER=<your-driver-db-name>
```

Everything in this file is mutable and needed, so make the necessary changes. If you need a more deep knowledge about how `.env` works go to [Laravel Presentation of How To Use Env](https://laravel.com/docs/8.x/configuration#environment-configuration).

## Running
After installing, you must run the command:

    $ npm run debug

to run the application with `logging` features, or

    $ npm run start

to run the application normally.

## Routing
The application has 4 (four) routes:
```
    POST localhost:<port-number>/login
    POST localhost:<port-number>/register
    POST localhost:<port-number>/edit
    GET  localhost:<port-number>/view
```

so you can test them

## Testing
The project doesn't have a test system yet :( (but it will comes soon).