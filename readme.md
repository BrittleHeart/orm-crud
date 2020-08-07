# Introduction

Welcome in my project. This project is simple CRUD (Create, Read, Update, Dalete) implementation with [Express](https://expressjs.com/) and [Sequelize](https://sequelize.org/master/).

## How to start

First of install dependencies

```bash
npm install
```

If you want start development server just type

```bash
npm run dev
```

This commend will start the development server without database connection, that's why, you have to change example config file (**config/database.example.js**) to real config (**config/database.js**) for your own type of method connection to the database. As an default, [PostgresSQL](https://www.postgresql.org/) is provided.

To build your javascript files just type 

```bash
npm run build-js
```