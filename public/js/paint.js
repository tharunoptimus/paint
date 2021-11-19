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
	(e) => {
		ctx.beginPath()
		ctx.moveTo(mouse.x, mouse.y)

		canvas.addEventListener("mousemove", onPaint, false)
	},
	false
)

canvas.addEventListener(
	"mouseup",
	() => {
		canvas.removeEventListener("mousemove", onPaint, false)
		savePaint()
	},
	false
)

let onPaint = function () {
	ctx.lineTo(mouse.x, mouse.y)
	ctx.stroke()
}

// This part will render the image thing in the canvas - very important 
// Couldn't find a way to refactor yet
let imageDataUrl = paintData
var image = new Image()
image.src = imageDataUrl
image.onload = function () {
	ctx.drawImage(image, 0, 0)
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
paintTitleSpan.addEventListener("click", async (e) => {
	let existingTitle = e.target.innerText
	let title = prompt("Enter Title", existingTitle)

	let paintId = getPaintIdFromUrl()

	let userId = userLoggedIn._id

	let request = await fetch("/api/paint/edit/title", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			paintId,
			title,
			userId,
		}),
	})
	if (request.status !== 204)
		return alert("Unable to Change Name. Please Try again!")
	e.target.innerText = title
})

let deleteButton = document.querySelector(".deleteButton")
deleteButton.addEventListener("click", async (e) => {
	let paintId = getPaintIdFromUrl()
	let request = await fetch("/api/paint/delete", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			paintId,
		}),
	})

	if (request.status !== 204) return alert("Could not delete paint!")
	window.location.reload()
})

async function savePaint() {
	let paintId = getPaintIdFromUrl()

	let data = canvas.toDataURL("image/png")

	let request = await fetch("/api/paint/save", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ paintId, data }),
	})
	if (!request.status == 204 && !shouldStopBroadcasting) {
		return alert(
			"Couldn't auto save. Check your Internet connection or Click on 'Save' Manually"
		)
	}
}

let downloadButton = document.querySelector(".downloadButton")
downloadButton.addEventListener("click", downloadCanvas, false)

function downloadCanvas(){
	let pageTitle = document.querySelector("#paintTitle").innerText
	let stringToInclude = `data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=${pageTitle}.png`
	
	destinationCanvas = document.createElement("canvas");
	destinationCanvas.width = 800;
	destinationCanvas.height = 589;
	destCtx = destinationCanvas.getContext('2d');
	destCtx.fillStyle = "#FFFFFF";
	destCtx.fillRect(0, 0, 800, 589);
	destCtx.drawImage(canvas, 0, 0);

	let dt = destinationCanvas.toDataURL('image/png');
	
	dt = dt.replace(/^data:application\/octet-stream/, stringToInclude);
	this.download = `${pageTitle}.png`
	this.href = dt;
}

let shareButton = document.querySelector(".shareButton")
shareButton.addEventListener("click", async (e) => {
	let title = document.querySelector("#paintTitle").innerText
	let url = window.location.href
	shareLink(title, url)
})

function shareLink(title, url) {
	if (navigator.share) {
		navigator
			.share({
				title: `${title}`,
				text: "See my new Paint!",
				url: url,
			})
			.catch(() =>
				alert("Unable to Generate Link. Copy the URL and share it!")
			)
	}
}