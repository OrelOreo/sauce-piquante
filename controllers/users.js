const { User } = require('../mongo')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function createUser(req, res) {
    try {
        const { email, password } = req.body
        const hashedPassword = await hashPassword(password)
        const user = new User({ email, password: hashedPassword })
        user.save()
        res.json({ message: "User enregistré "})
    } 
    catch (err) {
        res.status(400).json({ message: "serveur error" })
    }
}

function hashPassword(password) {
    return bcrypt.hash(password, 10)
}

async function loginUser(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email: email })
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(403).send({ message: "Mot de passe incorrect" })
        } else {
            const token = createToken(email)
            res.status(200).send({ userId: user?._id , token: token })
        }
    } catch(err) {
        console.error(err)
        res.status(500).send({ message: "Erreur interne "})
    }
}

function createToken(email) {
    const jwtPassword = process.env.JWT_PASSWORD
    return jwt.sign({ email: email }, jwtPassword, {expiresIn: "24h"})
}

module.exports = { createUser, loginUser }