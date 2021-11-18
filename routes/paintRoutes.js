const express = require("express")
const app = express()
const router = express.Router()
const User = require("../schemas/UserSchema")
const Paint = require("../schemas/PaintSchema")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "pug")
app.set("views", "views")


router.get("/:id", async (req, res) => {
	const { id } = req.params
	let paint = await Paint.findById(id)
	if (paint == null) return res.redirect("/")

	let payload = {
		pageTitle: paint.title,
		paint: JSON.stringify(paint),
		userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
	}

	return res.status(200).render("paint", payload)
})

router.get("/new/create", async (req, res, next) => {

    
    try {
		if(!req.session.user._id) {
			console.log(req.session.user)
			return res.redirect("/")
		}


		let newPaint = {
			title: "Untitled Paint",
			belongsTo: req.session.user._id,
		}

		let paint = await Paint.create(newPaint)
		return res.redirect(`/paint/${paint._id}`)
	} 
	catch (error) {
		console.log(error)
	}

})

router.get("/", (_, res) => res.redirect("/"))


module.exports = router
