<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

This is a NestJS-based backend application for managing comments. It provides authentication, comment creation, and pagination features using PostgreSQL and NestJS.

## Configuration and Running the App

To get the application running, follow these steps:

1. **Install application dependencies**  
   Install all the necessary dependencies for the application:

   ```bash
   npm install
   ```

2. **Set up environment variables**  
   Copy the environment variables from the `env.example` file and create a new `.env` file in your project root with the necessary configuration values.

3. **Start the Docker container**  
   Run the following command to start the Docker container:

   ```bash
   docker-compose up
   ```

4. **Run the application in development mode**  
   Start the application in development mode:
   ```bash
   npm run start:dev
   ```

Your application should now be running and ready for development.

##Swagger
Once the application is running, you can access the Swagger API documentation at:

http://localhost:3000/api/docs

This will allow you to interact with the API and test the available endpoints directly from the browser.

## Test

```bash
# unit tests
$ npm run test
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
