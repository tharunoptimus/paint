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


// Routes
const loginRoute = require("./routes/loginRoutes")
const registerRoute = require("./routes/registerRoutes")

app.use("/login", loginRoute)
app.use("/register", registerRoute)

app.get("/", middleware.requireLogin, (req, res, next) => {
    let payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    }
    res.status(200).send("This is the home Page")
})
