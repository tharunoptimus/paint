const express = require("express");
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json())


const router = express.Router();
const User = require("../../schemas/UserSchema");
const Paint = require("../../schemas/PaintSchema");




router.post("/edit/title", async (req, res) => {
    let { paintId, title, userId } = req.body

    
    try {
        let user = await User.findById(userId)
        if(!user.paints.includes(paintId)) return res.status(401).send("You are not authorized to edit this")

        let paint = await Paint.findByIdAndUpdate(paintId, { title: title})
        return res.status(204).send({title : title})
    } catch (err) {
        console.log(err)
        return res.status(400).send("Unable to Edit. Please Try again!")
    }
    
})

router.post("/edit/save", async (req, res) => {
    let { paintId, data, userId } = req.body
    
    let user = await User.findById(user)
    if(!user.paints.includes(paintId)) return res.status(401).send("You are not authorized to edit this")

    try {
        let paint = await Paint.findByIdAndUpdate( paintId, { data: data })
        return res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.status(400).send("Something went wrong")
    }
})

module.exports = router;