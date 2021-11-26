const express = require("express")
const app = express()
const router = express.Router()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "pug")
app.set("views", "views")

router.get("/", (_, res) => {
	res.status(200).render("about")
})

module.exports = router
