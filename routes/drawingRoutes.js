const express = require("express")
const app = express()
const router = express.Router()
const User = require("../schemas/UserSchema")
const Paint = require("../schemas/PaintSchema")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "pug")
app.set("views", "views")

router.get("/", (_, res) => res.redirect("/"))

router.get("/:id", async (req, res) => {
	const { id } = req.params
	let paint = await Paint.findById(id)

	if (paint == null) return res.redirect("/")
	if (!paint.isShared) return res.redirect("/")

	let payload = {
		pageTitle: paint.title,
		paint: JSON.stringify(paint),
	}

	return res.status(200).render("paint", payload)
})

module.exports = router
