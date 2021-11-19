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

ctx.strokeStyle = "#000000"
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
	if (this.value > 0 && this.value <= 20) {
		getSize(this.value)
	}
})

function getPaintIdFromUrl() {
	let pathString = window.location.pathname
	let substrPath = 7
	return pathString.substring(substrPath)

}

let paintTitleSpan = document.getElementById("paintTitle")
paintTitleSpan.addEventListener("click", async e => {
	let existingTitle = e.target.innerText
	let title = prompt("Enter Title", existingTitle)

	let paintId = getPaintIdFromUrl()

	let userId = userLoggedIn._id

	let request = await fetch("/api/paint/edit/title" , {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body : JSON.stringify({
			paintId,
			title,
			userId
		})
	})
	if(request.status !== 204) return alert("Unable to Change Name. Please Try again!")
	e.target.innerText = title

})

let deleteButton = document.querySelector(".deleteButton")
deleteButton.addEventListener("click", async e => {
	let paintId = getPaintIdFromUrl()
	let request = await fetch("/api/paint/delete", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body : JSON.stringify({
			paintId
		})
	})

	if(request.status !== 204) return alert("Could not delete paint!")
	window.location.reload()
})