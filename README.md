# Client-Server problem detector

Web application that detects a customer problem in his device after entering details about it.

## Description

Client-Server web application using React and NodeJS. The app contains a form page that asks 
the customer details about his device problem, and returns a response accordingly. If the customer
entered valid input, the response he received, along with the current date and time and his form input
saved into SQL data base.

## Getting Started

### Dependencies

* NodeJS
* MySQL

### Installing

After downloading the projects file locally:
* Enter the client directory and run the command:
```
npm install
```
* Enter the server directory and run the command:
```
npm install
```
* In './server/index.js' change the password of the data base to your local password

### Executing program

* Enter the server directory and run the command:
```
npm run dev
```
* Enter the client directory and run the command:
```
npm start
```

During the first time running the project:
* Enter the path: 
```
localhost:5000/createDB
```
in order to create the data base locally
* Enter the path:
```
localhost:5000/createTable
```
in order to create the table in the data base
