const mongoose = require("mongoose")
class Database {

    constructor() {
        let MONGO_URI = process.env.MONGO_URI
        this.connect(MONGO_URI);
    }

    connect(MONGO_URI) {
        mongoose.connect(MONGO_URI)
        .then(() => {
            console.log("Database Connection Successful!");
        })
        .catch((err) => {
            console.log("Database Connection Failed!" + err);
        })
    }
}

module.exports = new Database();