const express = require('express')
const app = express()
const port = 3000
const booksObj = require('./books.json')
const fs = require('fs-extra');
var validator = require('validator');



app.get('/', (req, res) => {
    res.send("<h1>Wellcone to the library</h1>")
})

app.get("/books", (req, res) => {
    if (req.query) {
        booksObj.forEach((book) => {
            if (book.id == parseInt(req.query.id)) {
                res.send(JSON.stringify(book));
            } else if (book.name == req.query.name) {
                res.send(JSON.stringify(book));
            }
        });
    }
    res.send(JSON.stringify(booksObj));
});


app.post('/books', (req, res) => {
    let NewBooksObj = res.json({
        "id": booksObj.length.id + 1,
        "name": "TheLionKing",
        "date": "10.1.2020",
        "publish_date": "25.5.1988"
    })
    fs.readFile("books.json", (err, data) => {
        var NewBooksObj = JSON.parse(data);
        NewBooksObj.push(NewBooksObj);
        fs.writeFile("books.json", JSON.stringify(NewBooksObj), err => {
            console.log(err);
        })
    })
    res.send(NewBooksObj);
    if (validator.isEmpty(booksObj.name, booksObj.date, booksObj.publish_date)) {
        res.send('Successfully create user');
    } else {
        throw TypeError('Write the correct fields please')
    }
})


const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/the_big_library";
const client = new MongoClient(url);
const dbName = 'the_big_library';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection("books").insertMany(booksObj, function (err, db) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})