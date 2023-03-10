const { User } = require('../mongo')
const bcrypt = require('bcrypt')

async function createUser(req, res) {
    const { email, password } = req.body
    const hashedPassword = await hashPassword(password)

    const user = new User({ email, password: hashedPassword })

    user.save()
        .then(() => res.send({ message: "User enregistré "}))
        .catch((err) => console.log("User non enregistré ", err))
}

function hashPassword(password) {
    return bcrypt.hash(password, 10)
}

function loginUser(req, res) {
    const email = req.body.email
    const password = req.body.password
}

module.exports = { createUser, loginUser }