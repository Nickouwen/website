**Project Purpose: To learn Go CRUD development while providing a useful product for my family to use**

- React / Go CRUD app developed using examples from https://www.jetbrains.com/guide/go/tutorials/rest_api_series/stdlib/ 
- Architecture and some logic taken from https://dev.to/bagashiz/building-restful-api-with-hexagonal-architecture-in-go-1mij
- Database connection logic from https://github.com/FransK/truthiness/

# Backend Architecture:
This was my first time attempting to make a Go application, and so I followed the hexagonal architecture pattern, outlined in this post: https://dev.to/bagashiz/building-restful-api-with-hexagonal-architecture-in-go-1mij

I did not follow their layout exactly, and I sort of mashed together some code that I took from my brother's Git repo, where he has a very comprehensive API layout for his own app.

## Layout:

### Folder Structure:

```
api
 |-- cmd
 |    |-- http
 |-- internal
      |-- adapter
      |    |-- db
      |    |-- handler
      |    |-- repository
      |-- core
          |-- domain
          |-- port
```

- api is the parent folder for the backend API that I have written in Go, and it contains the relevant go setup files, the Dockerfile, some testdata, and then the actual API code (cmd and internal)

    - cmd contains the main.go file, used to launch the api

    - internal contains the internal functions that are not to be exposed (not exactly sure if this is relevant to my use case, as I am not making a module for others to use)

        - adapter contains 3 packages: db, handler, and repository

            - db contains functions to establish a new database connection to the mongodb instance. This code was taken from my brother's API, as it is a neat way to instantiate the database, returning a mongo database object

            - handler is used to route data based on the method of the request sent to the api, routing (or handling) the data to a the correct function. The database connection logic is then contained in the repository package or folder

            - repository is used to define the actual database calls to the mongodb database

        - core contains 2 packages: domain and port

            - domain contains the table / object definitions using Go structs

            - port contains the interfaces that are used to implement the database calls separate from the database logic

# Frontend Architecture:
```
client
  |---- public
  |---- src
         |--- api
         |--- components
         |--- types
```

- client is the parent folder for the frontend React portion of the website. I am using Typescript to learn it, as I have used React with Javascript before. The project was initialized through Vite's app initialization 'npm create vite@latest'. Inside client, I have two relevant folders; public and src. 

    - public contains any images that React needs to display to the user, which in this case is only the favicon.

    - src contains the source code for the React app, holding main.tsx and App.tsx, as well as the api, components, and types

        - api contains any helper functions I need in order to make API calls to my Go API. For this project, it is just CRUD functions using fetch commands.

        - components contains my React components and their relevant styling side-by-side.

        - types contains the interfaces used by Typescript to describe the structure of my JSON objects. This leads to a few headaches, and I would be more careful when handling types next time I make a React app.
