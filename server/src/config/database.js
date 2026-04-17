const mongoose = require("mongoose")



async function connectToDB() {
    const uri = process.env.MONGO_URI
    if (!uri) {
        throw new Error("Missing MONGO_URI environment variable")
    }

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        })
        console.log("Connected to Database")
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message)
        throw err
    }
}

module.exports = connectToDB