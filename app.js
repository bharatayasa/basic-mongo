const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {connectToDb, getDb} = require('./config/db.config')
const {ObjectId} = require('mongodb');

dotenv.config()
const app = express(); 

connectToDb((err) => {
    if (!err) {
        db = getDb()
    }
})

const corsOption = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}

app.use(cors(corsOption)); 
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message : "server is running"
    })
})

app.get('/books', (req, res) => {
    db.collection('books')
        .find()
        .sort({author: 1})
        .toArray()
        .then((result) => {
            res.status(200).json({
                message:'success',
                result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "failed to get data",
                err
            });
        });
});

app.get('/books/:id', (req, res) => {
    db.collection('books')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message:'success',
                    result
                });
            } else {
                res.status(404).json({
                    message: "Data not found"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to get one data",
                err
            });
        });
});

app.post('/books', (req, res) => {
    const books = req.body

    db.collection('books')
        .insertOne(books)
        .then((result) => {
            res.status(201).json({
                status: "success",
                message: 'data created',
                result
            })
        }).catch((err) => {
            res.status(500).json({
                message: "Failed add data",
                err
            })
        });
});

app.delete('/books/:id', (req, res) => {
    db.collection('books')
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then((result) => {
            if (result) {
                res.status(200).json({
                    status: "success",
                    message:"data deleted",
                    result
                });
            } else {
                res.status(404).json({
                    message: "Data not found"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to delete one data",
                err
            });
        });
});

app.put('/books/:id', (req, res) => {
    const updates = req.body

    db.collection('books')
        .updateOne({ _id: new ObjectId(req.params.id) }, {$set: updates})
        .then((result) => {
            if (result) {
                res.status(200).json({
                    status: "success",
                    message:"data updated",
                    result
                });
            } else {
                res.status(404).json({
                    message: "Data not found"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to update one data",
                err
            });
        });
});

const port = process.env.PORT || 3000
const host = 'localhost'

app.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
})
