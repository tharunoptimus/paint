let imageDataUrl = paintData
let img = document.getElementById("paint")
img.src = imageDataUrl
let pageTitle = document.querySelector("#paintTitle").innerText

let downloadButtons = document.querySelectorAll(".downloadButton")
downloadButtons.forEach(button => {
	button.addEventListener("click", downloadImage, false)
})

function downloadImage () {
	let stringToInclude = `data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=${pageTitle}.png`
	
	destinationCanvas = document.createElement("canvas");
	destinationCanvas.width = 800;
	destinationCanvas.height = 589;
	destCtx = destinationCanvas.getContext('2d');
	destCtx.fillStyle = "#FFFFFF";
	destCtx.fillRect(0, 0, 800, 589);
	destCtx.drawImage(img, 0, 0);

	let dt = destinationCanvas.toDataURL('image/png');
	
	dt = dt.replace(/^data:application\/octet-stream/, stringToInclude);
	this.download = `${pageTitle}.png`
	this.href = dt;
}