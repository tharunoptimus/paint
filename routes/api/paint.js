const express = require("express");
const app = express();
const router = express.Router();
const User = require("../../schemas/UserSchema");
const Paint = require("../../schemas/PaintSchema");


app.use(express.urlencoded({extended: true}));
app.use(express.json())




module.exports = router;