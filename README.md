# V2-exercise

## Descripción del Ejercicio:

En este ejercicio, te pondrás en el papel de un desarrollador backend que debe
diseñar e implementar una solución para un cliente con las siguientes necesidades.
Requisitos del Cliente


1. Recepción de Listado de Personas:
    - El sistema debe ser capaz de recibir un archivo CSV que contenga un listado de
        personas. Cada persona tiene los siguientes atributos: ID, Nombre, Email, y Créditos.
    - Si una persona ya existe en el sistema "CRM" (API), sus datos deben ser actualizados.


2. Intercambio de Créditos:
    - El sistema debe permitir el intercambio de créditos entre personas. Esto implica que una
    persona puede transferir una cantidad de sus créditos a otra persona.


3. Reporte de Créditos Intercambiados:
    - El sistema debe ser capaz de generar un reporte que indique cuántos créditos se han
    intercambiado en total en un período de tiempo específico.


# V2 Exercise Application

This application is designed to manage user credit transactions and generate reports on these transactions. The application uses Node.js, Express, and MongoDB.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Postman collection](#postman-collection)

## Installation

1. **Clone the repository**:
    ```bash
    git clone git@github.com:Agustin133/V2-exercise.git
    cd V2-exercise
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Configuration

1. **Environment Variables**:
    Create a `.env` file in the root of the project and add the following variables:
    ```env
    MONGODB_URI=<your-mongodb-uri>
    PORT=8080
    JWT_SECRET=<your secret>
    ```

    - `MONGODB_URI`: The connection string for your MongoDB database.
    - `PORT`: The port on which the server will run.

## Running the Application

1. **Start the development server**:
    ```bash
    npm run dev
    ```

    This will start the server using `ts-node-dev` for hot-reloading during development.

## Postman collection
https://crimson-meteor-393171.postman.co/workspace/My-Workspace~9bfb9e9e-74f6-4034-8b23-9b93c9284f4d/collection/14082617-e3a21afc-59ce-4106-8c5b-ae25b56be1d1?action=share&creator=14082617