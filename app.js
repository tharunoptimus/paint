require("dotenv").config()
const express = require("express")
const app = express()
const useragent = require('express-useragent')
const port = process.env.PORT || 3003
const path = require('path')
const middleware = require("./middleware")
const mongoose = require("./database")
const session = require("express-session")

app.listen(port, () =>
	console.log("Server Listening on " + port)
)

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(useragent.express())

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))


// Routes
const loginRoute = require("./routes/loginRoutes")
const registerRoute = require("./routes/registerRoutes")
const logoutRoute = require("./routes/logoutRoutes")
const paintRoute = require("./routes/paintRoutes")
const aboutRoute = require("./routes/aboutRoutes")


// API Routes

const paintApi = require("./routes/api/paint")

app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/logout", logoutRoute)
app.use("/paint", paintRoute)
app.use("/about", aboutRoute)

app.use("/api/paint", paintApi)

app.get("/", middleware.requireLogin, (req, res, next) => {
    let payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
        paints: req.session.user.paints.length,
        userLoggedInJs: JSON.stringify(req.session.user),
    }
    res.status(200).render("home", payload)
})
