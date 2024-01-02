const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
let dbConnection
dotenv.config()
const url = process.env.URL

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(url)
        .then((client) => {
            dbConnection = client.db()
            console.log("connected to database mongodb");
            return cb()
        }).catch((err) => {
            console.log("error connecting to databae", err);
            return cb(err)
        });
    },
    getDb: () => dbConnection 
}
