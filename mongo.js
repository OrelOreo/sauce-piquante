const mongoose = require('mongoose')
const usernameDB = process.env.DB_USERNAME
const passwordDB = process.env.DB_PASSWORD
mongoose.connect(`mongodb+srv://${usernameDB}:${passwordDB}@p6-ocr.ay1vjps.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log("Connected to MongoDB !"))
    .catch((err) => console.error("Error connecting to MongoDB :/ : ", err))

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)

module.exports = { mongoose, User }