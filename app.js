var mysql = require('mysql');
var express = require('express');

const app = express();

//Connection NodeJS To MySQL Server 
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'node_test'
});

//Connect Into Database
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Database Connect Complete")
});

//Create Database Using Node JS
app.get('/createDb', (req, res) => {
    let sqlCreateDb = 'CREATE DATABASE `Database_Name`';
    db.query(sqlCreateDb, (err, result)=> {
        if(err) throw err;
        console.log(result);
        res.send('Database created....');
    });
});

//Create Table Using Node JS
app.get('/createPostsTable', (req, res) => {
    let sqlCreate = 'CREATE TABLE `Table_Name`(Id Int AUTO_INCREMENT, Title TEXT, Post TEXT, PRIMARY KEY (Id))';
    db.query(sqlCreate, (err, result)=> {
        if(err) throw err;
        console.log(result);
        res.send('table created....');
    });
});

//Insert Into Table Using Node JS
app.get('/insertIntoTable', (req, res) => {
    let post = {Title: 'One', Post: 'Is Title One'};
    let sqlInsert = 'INSERT INTO `Table_Name` SET ?';
    let query = db.query(sqlInsert, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('One Added....');
    });
});

//Get Posts From Table Using Node JS
app.get('/getPostsTable', (req, res) => {
    let sqlGet = 'SELECT * FROM `Table_Name`';
    let query = db.query(sqlGet, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data Fetched....');
    });
});

//Get Single Post From Table Using Node JS
app.get('/getPostsTable/:Id', (req, res) => {
    let sqlGet = `SELECT * FROM Table_Name WHERE Id = ${req.params.Id}`;
    let query = db.query(sqlGet, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Data Fetched....');
    });
});

//Update Posts In Table Using Node JS
app.get('/updatePostTable/:Id', (req, res) => {
    let updateTitle = 'Updated Title';
    let sqlGet = `Update Table_Name Set Title='${updateTitle}' WHERE Id = ${req.params.Id}`;
    let query = db.query(sqlGet, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Data Updated Complete....');
    });
});

//Delete Posts In Table Using Node JS
app.get('/deletePostTable/:Id', (req, res) => {
    let sqlGet = `DELETE FROM Table_Name WHERE Id = ${req.params.Id}`;
    let query = db.query(sqlGet, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Post Deleted Complete....');
    });
});

//Set Server Port With NodeJS
app.listen('3000', () => {
    console.log("Server Started");
});