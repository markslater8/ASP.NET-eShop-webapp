# ASP.NET-eShop

![.NET](https://github.com/gchurch/ASP.NET-eShop/workflows/.NET/badge.svg)

I have created a mock online store using ASP.NET Core. I have created a few different versions of the front end using different technologies. The front-end technologies I have used are Angular, Razor and React. The solution uses a clean architecture which results in the different front ends being easily substitutable for one another. I make use of Entity Framework Core to work with an SQL Server database. I have also created some unit tests and integration tests for the application.

## Angular Front End

I have created an SPA front end version with Angular. I have implemented basket functionality with data stored locally. This version of the application has no authentication or authorization. The code for this version of the application can be found in the Web.Angular project.

The Angular app uses a back-end API created with ASP.NET Core MVC. The code for the API is located in the Api project.

The application has the following API:

| API                       | Description                | Request body | Response body     |
| ------------------------- | -------------------------- | ------------ | ----------------- |
| GET /api/Products         | Get all products           | None         | Array of products |
| GET /api/Products/{id}    | Get a product by ID        | None         | Product           |
| POST /api/Products        | Add a new product          | Product      | Product           |
| PUT /api/Products         | Update an existing product | Product      | Product           |
| DELETE /api/Products/{id} | Delete a product           | None         | None              |

To run the application locally, in a command prompt navigate to src\Web.Angular\ClientApp and run the command "npm start". Then in Visual Studio set the Web.Angular project as the startup project and then start. 

## Razor Front End

I have also created a separate front end using ASP.NET Core MVC and Razor. For this version of the application, I have implemented authentication and authorization using Identity. Users must be registered and logged in to an account in order to create a product. Users can only edit and delete products that they have created themselves. The admin account can edit and delete any product. I have also implemented basket functionality with data stored in the database. The code for this version of the application can be found in the Web.Razor project.

To run the application locally, set the Web.Razor project as the startup project and then start.

## React Front End

I have created another SPA front end, this time using React. This is similar to the Angular app and uses the same back-end API. The code for this version of the application can be found in the Web.React project.

To run the application locally, in a command prompt navigate to src\Web.React\ClientApp and run the command "npm start". Then in Visual Studio set the Web.React project as the startup project and then start.

## Blazor Front-end

The Blazor front-end is currently a work in progress.

## Clean Architecture

A Clean Architecture based on https://github.com/ardalis/CleanArchitecture is used to organize the code.

The Clean Architecture separates the application into three layers with each layer being a separate project. The layers are the ApplicationCore, Infrastructure and Web (User Interface). ApplicationCore contains the Entities, interfaces and services; Infrastructure contains the database code; and Web contains the controllers and front-end code. Using a clean architecture results in the different front-ends I created being easily substitutable for one another. You just need to set the front-end project that you want to run as the startup project.

## Database

The application data is stored in an SQL Server database. Entity Framework Core is used to work with the database. I have used migrations to update the database schema. LINQ is used to make queries to the database. Products that are created on the site are stored in the database. The Razor front end application stores the basket information for each user in the database.

## Testing

Tests that I have created for the application can be found in the tests folder. I have created some unit tests for the application. Unit testing is performed with MSTest using the Shouldly assertion framework and the Moq mocking framework. I have tried to follow good practice when it comes to unit testing. I have also created some integration tests for the application. I create a test server and make requests to it and test the responses. To do this I make use of the WebApplicationFactory class and use an in-memory test database.
