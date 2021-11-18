const express = require("express")
const app = express()
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../schemas/UserSchema")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "pug")
app.set("views", "views")

router.get("/", (_, res) => res.redirect("/"))

module.exports = router
