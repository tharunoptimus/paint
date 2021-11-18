const mongoose = require("mongoose")
const Schema = mongoose.Schema
const PaintSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		data: { type: String },
		belongsTo: { type: Schema.Types.ObjectId, ref: "User" },
		isShared: { type: Boolean, default: false }
	},
	{ timestamps: true }
)

var Paint = mongoose.model("Paint", PaintSchema)
module.exports = Paint
