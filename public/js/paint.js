let canvas = document.getElementById("paint")
let ctx = canvas.getContext("2d")

let sketch = document.getElementById("sketch")
let sketch_style = getComputedStyle(sketch)

canvas.width = 800
canvas.height = 589

let mouse = { x: 0, y: 0 }

/* Mouse Capturing Work */
canvas.addEventListener(
	"mousemove",
	function (e) {
		mouse.x = e.pageX - this.offsetLeft
		mouse.y = e.pageY - this.offsetTop
	},
	false
)

/* Drawing on Paint App */
ctx.lineJoin = "round"
ctx.lineCap = "round"

ctx.strokeStyle = "red"
function getColor(colour) {
	ctx.strokeStyle = colour
}

function getSize(size) {
	ctx.lineWidth = size
}

//ctx.strokeStyle =
//ctx.strokeStyle = document.settings.colour[1].value;

canvas.addEventListener(
	"mousedown",
	function (e) {
		ctx.beginPath()
		ctx.moveTo(mouse.x, mouse.y)

		canvas.addEventListener("mousemove", onPaint, false)
	},
	false
)

canvas.addEventListener(
	"mouseup",
	function () {
		canvas.removeEventListener("mousemove", onPaint, false)
	},
	false
)

let onPaint = function () {
	ctx.lineTo(mouse.x, mouse.y)
	ctx.stroke()
}

function removeTransformOnButton() {
	let buttons = document.querySelectorAll(".colors button")
	buttons.forEach((button) => {
		button.style.removeProperty("transform")
	})
}

function makeButtonBigger(id) {
	let button = document.getElementById(id)
	console.log({ button, id })
	button.style.transform = "scale(1.4)"
}

let colors = document.querySelector(".colors")
let size = document.querySelector("#brushSize")

colors.addEventListener("click", function (e) {
	if (e.target.tagName === "BUTTON") {
		removeTransformOnButton()
		let hex = e.target.id
		makeButtonBigger(hex)
		hex = hex.substring(1)
		hex = "#" + hex
		getColor(hex)
	}
})

size.addEventListener("mouseup", function () {
	if (this.value > 0 && this.value < 20) {
		getSize(this.value)
	}
})

let paintTitleSpan = document.getElementById("paintTitle")
paintTitleSpan.addEventListener("click", e => {
	
})