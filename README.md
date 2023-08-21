# Futebol Clube ⚽🏆

The TFC is an informative website about football matches and standings! ⚽️

In the TFC development team, my squad was responsible for creating an API and also integrating the applications using docker-compose.

In this project, I built a dockerized backend using data modeling through Sequelize. My development had to adhere to business rules provided in the project, and my API can be consumed by a frontend already developed in this project.

Deadline: August 23, 2023 at 2:00 pm


<details>
  <summary><strong>🏗 Project structure</strong></summary><br />

The files created by me are in `app/backend/src/`:

- In the folder  📁`controllers` there are the files responsible for receiving all user requests and controlling what will be shown to the user.
- In the folder  📁`services` there are the files responsible for doing the business rules.
- In the folder  📁`database` there are migrations files, models files, seeders files.
- In the folder  📁`routers` there are the files responsible for defining routes.
- In the folder  📁`middlewares` there are the files responsible for the validations.
- In the folder  📁`utils` there are files with auxiliary function.
- In the folder  📁`tests` there are integration test files for the created routes.

The created endpoints are:
- GET /teams
- GET /teams/:id
- POST /login
- GET /login/role
- GET /matches
- PATCH /matches/:id/finish
- PATCH /matches/:id
- POST /matches
- GET /leaderboard/home
- GET /leaderboard/away

</details>

<details>
  <summary><strong>🖥️ To access</strong></summary><br />

1 - Clone the repository:
`git@github.com:tryber/sd-028-b-trybe-futebol-clube.git`

2 - Enter the repository folder you just cloned.

You must be using node version 16 (or higher).

To check your version, use the command:
`nvm --version`

<details>
  <summary><strong>Docker Configuration 🐳</strong></summary><br />

⚠ Your docker-compose must be in version 1.29 or higher.  ⚠
[Check the documentation here to update the docker-compose version.](https://docs.docker.com/compose/install/)

To run the application on your local machine, you need to execute the command `npm run compose:up` at the root of the project.

</details>

<details id='sequelize'>
  <summary><strong>🎲 Sequelize</strong></summary>
  <br/>

 For development, the product team provided an Entity-Relationship Diagram (ERD) to build the database modeling.

   ![image](https://github.com/VicSales28/project-futebol-clube/assets/115190439/160edfe7-6028-44c1-9654-80369f961179)

⚠️ The `package.json` in the `app/backend` directory contains a script called `db:reset`, which is responsible for dropping the database, recreating it, and running the migrations and seeders. You can execute it using the command `npm run db:reset` if you need to recreate the database for any reason.

⚠️ There are already prepared seeders in `app/backend/src/database/seeders`. You can use them as a reference to create your own migrations based on the fields and tables that the seeders will populate. Once you create a migration, you should rename the corresponding seeder by removing the underscore (`_`) at the end of its name. This way, the `db:reset` script will use it during testing to ensure that your migration works as expected.

⚠️ Any sequelize-cli commands should be executed within the `app/backend` directory.

⚠️ **Sequelize has already been initialized, so there is NO need to run `sequelize init` again.**

</details>

<details>
  <summary><strong>🧪 Running tests locally </strong></summary>

To run the project tests on your machine, it's necessary for all your containers to be up and healthy.

**:eyes: Running Tests Locally**

With the _Database_, _Backend_, and _Frontend_ containers up and healthy:
- To execute all tests, run this command at the root of the backend:
  `npm test`

</details>

</details>

<details>
  <summary><strong>🗣 Feedbacks</strong></summary><br />
  
_Give me feedbacks, I'm open to new ideas_ 😉

</details>

