require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { createUser, loginUser } = require('./controllers/users')
const app = express()
const port = 3000

// Connection DB
require('./mongo')

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.post("/api/auth/login", loginUser)
app.post("/api/auth/signup", createUser)
app.get("/", (req, res) => res.send("Hello World"))

// Listen
app.listen(port, () => console.log("Listening on port " + port))


