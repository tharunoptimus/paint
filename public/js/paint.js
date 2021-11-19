var canvas = document.getElementById("paint")
var ctx = canvas.getContext("2d")

var sketch = document.getElementById("sketch")
var sketch_style = getComputedStyle(sketch)

canvas.width = 800
canvas.height = 589

var mouse = { x: 0, y: 0 }

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

var onPaint = function () {
	ctx.lineTo(mouse.x, mouse.y)
	ctx.stroke()
}






let colors = document.querySelector(".colors")
let size = document.querySelector("#brushSize")

colors.addEventListener("click", function (e) {
	if (e.target.tagName === "BUTTON") {
		let id = e.target.id
		getColor(id)
	}
})

size.addEventListener('mouseup', function() {
    if (this.value > 0 && this.value < 20) {
        getSize(this.value)
		console.log("Called getSize")
	}
})
