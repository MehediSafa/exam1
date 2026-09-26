const mongoose = require('mongoose')

function mongoDBConfig() {
    return mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("MongoDB Connected");
        })
        .catch((err) => {
            console.log("MongoDB connection Error:", err);
        });
}
module.exports = mongoDBConfig