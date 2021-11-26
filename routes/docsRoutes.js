const express = require("express")
const app = express()
const router = express.Router()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "pug")
app.set("views", "views")

router.get("/database", async (req, res) => {
    res.status(200).render("database")
})

router.get("/api", async (req, res) => {
	res.status(200).render("apidocs")
})

module.exports = router
