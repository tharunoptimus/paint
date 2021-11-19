let createNewPaintDiv = document.getElementById("newPaint")
createNewPaintDiv.addEventListener("click", (e) => {
	return (window.location.href = "/paint/new/create")
})

document.querySelectorAll(".paintContainer").forEach((item) => {
	item.addEventListener("click", (event) => {
		let id = event.target.getAttribute("data-url")
		window.location.href = `paint/${id}`
	})
})
