require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3003
const middleware = require("./middleware")
const mongoose = require("./database")

app.listen(port, () =>
	console.log("Server Listening on " + port)
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).send("This is the home Page")
})
