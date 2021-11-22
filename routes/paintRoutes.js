const express = require("express")
const app = express()
const router = express.Router()
const useragent = require('express-useragent')
const User = require("../schemas/UserSchema")
const Paint = require("../schemas/PaintSchema")
let Border = require("./template/borderTemplateData")
let Cat = require("./template/catTemplateData")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(useragent.express())

app.set("view engine", "pug")
app.set("views", "views")


router.get("/:id", async (req, res) => {
	const { id } = req.params
	let paint = await Paint.findById(id)
	if (paint == null) return res.redirect("/")
	
	
	if(req.session.user) {
		
		let isOwner = paint.belongsTo == req.session.user._id
		let isDesktop = req.useragent.isDesktop == true 
		if (isOwner && isDesktop) {
			
			let payload = {
				pageTitle: paint.title,
				paint: JSON.stringify(paint),
				userLoggedIn: req.session.user,
				paintData: JSON.stringify(paint.data),
				userLoggedInJs: JSON.stringify(req.session.user),
			}
			
			return res.status(200).render("paint", payload)
		}	
	}
	
	let sharePayload = {
		pageTitle: paint.title,
		paint: JSON.stringify(paint),
		paintData: JSON.stringify(paint.data),
		userLoggedIn: "'value'",
		userLoggedInJs: "'value'",
	}
	return res.status(200).render("view", sharePayload)

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

		res.redirect(`/paint/${paint._id}`)

		await User.findByIdAndUpdate(req.session.user._id, { $addToSet: { paints: paint._id } })
	} 
	catch (error) {
		console.log(error)
	}

})

router.get("/new/create/border", async (req, res, next) => {

    
    try {
		if(!req.session.user._id) {
			console.log(req.session.user)
			return res.redirect("/")
		}


		let newPaint = {
			title: "Paint with Borders",
			belongsTo: req.session.user._id,
			data: Border
		}

		let paint = await Paint.create(newPaint)

		res.redirect(`/paint/${paint._id}`)

		await User.findByIdAndUpdate(req.session.user._id, { $addToSet: { paints: paint._id } })
	} 
	catch (error) {
		console.log(error)
	}

})

router.get("/new/create/cat", async (req, res, next) => {

    
    try {
		if(!req.session.user._id) {
			console.log(req.session.user)
			return res.redirect("/")
		}


		let newPaint = {
			title: "Paint with Cute Cat",
			belongsTo: req.session.user._id,
			data: Cat
		}

		let paint = await Paint.create(newPaint)

		res.redirect(`/paint/${paint._id}`)

		await User.findByIdAndUpdate(req.session.user._id, { $addToSet: { paints: paint._id } })
	} 
	catch (error) {
		console.log(error)
	}

})

router.get("/", (_, res) => res.redirect("/"))


module.exports = router
