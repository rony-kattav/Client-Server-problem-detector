const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { calcMsg, getCurrDate } = require('./handleData/handleStatus');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const dbName = "inquiriesdb";
const tableName = "user_forms";
// connect to the data base
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    // change your local sql password here:
    password: 'WebApp22!',
});

// GET route for creating the data base locally for the first time
app.get("/createDB", (req, res) => {
    const createDb = `CREATE DATABASE ${dbName}`;
    db.query(createDb, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("DB created");
    });
});

// GET route for creating the table of the data base for the first time
app.get("/createTable", (req, res) => {
    const createTable = `CREATE TABLE ${dbName}.${tableName} (userID INT NOT NULL, problem VARCHAR(300) NOT NULL, serialNum VARCHAR(64) NOT NULL, lightsStatus JSON NOT NULL, currDate VARCHAR(100) NOT NULL, responseStatus VARCHAR(100) NOT NULL)`;
    db.query(createTable, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Table created");
    })
});

// POST request for the user form input
app.post('/responseStatus', (req, res) => {
    const userData = req.body.userData;
    const {userID, problem, serialNum, lightsStatus} = userData;
    const currDate = getCurrDate();
    const responseStatus = calcMsg(userData);
    // save ths data only if indicator lights are valid
    if(responseStatus.statusIndex === 1){
        const sqlInsert = `INSERT INTO ${dbName}.${tableName} (userID, problem, serialNum, lightsStatus, currDate, responseStatus) VALUES (?,?,?,?,?,?)`;
        db.query(sqlInsert,
            [userID, problem, serialNum, JSON.stringify(lightsStatus), currDate, responseStatus.msg],
            (err) => {
            if(err) throw err;
        })
    }

    res.send(responseStatus.msg);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});