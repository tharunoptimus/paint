const express = require("express")
const app = express()
const router = express.Router()
const User = require("../../schemas/UserSchema")
const Paint = require("../../schemas/PaintSchema")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.post("/edit/title", async (req, res) => {
	let { paintId, title, userId } = req.body
	try {
		let user = await User.findById(userId)
		if (!user.paints.includes(paintId))
			return res.status(401).send("You are not authorized to edit this")

		let paint = await Paint.findByIdAndUpdate(paintId, { title: title })
		return res.status(204).send({ title: title })
	} catch (err) {
		console.log(err)
		return res.status(400).send("Unable to Edit. Please Try again!")
	}
})

router.post("/edit/save", async (req, res) => {
	let { paintId, data, userId } = req.body

	let user = await User.findById(user)
	if (!user.paints.includes(paintId))
		return res.status(401).send("You are not authorized to edit this")

	try {
		let paint = await Paint.findByIdAndUpdate(paintId, { data: data })
		return res.sendStatus(204)
	} catch (err) {
		console.log(err)
		res.status(400).send("Something went wrong")
	}
})

router.delete("/delete", async (req, res) => {
	let { paintId } = req.body
	let userId = req.session.user._id

	let user = await User.findById(userId)
	if (user == null) return res.redirect("/")
	if (!user.paints.includes(paintId))
		return res
			.status(401)
			.send("You're not authorized to Delete this paint!")

	try {
		await Paint.findByIdAndDelete(paintId).catch((err) => console.log(err))
		await User.findByIdAndUpdate(userId, { $pull: { paints: paintId } })
		return res.sendStatus(204)
	} catch (err) {
		console.log(err)
		res.sendStatus(400)
	}
})

router.put("/save", async (req, res) => {
	let { paintId, data } = req.body
	let userId = req.session.user._id

	let user = await User.findById(userId)
	if (user == null) return res.redirect("/")
	if (!user.paints.includes(paintId))
		return res
			.status(401)
			.send("You're not authorized to Delete this paint!")

	try {
		let paint = await Paint.findByIdAndUpdate(paintId, { data: data })
		res.sendStatus(204)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

router.get("/preview/paints", async (req, res) => {
    if(!req.session.user) return res.status(401).send("You are not logged in")
    let userId = req.session.user._id
    let user = await User.findById(userId).populate({ path: "paints", options: { sort: { updatedAt: -1 } } })
    let paints = user.paints
    res.status(200).send(paints)
})

module.exports = router
