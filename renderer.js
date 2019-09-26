const { ipcRenderer } = require('electron')

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//renderer.js

// Listener when new file is upload
document.getElementById('imageFile').addEventListener('change', () => {
	loadPreview(document.getElementById('imageFile'));
	setTimeout(() => {displaySize(true);}, 200);
	
});

// Listener when width input range is moved
document.getElementById('range').addEventListener('change', () => {
	resizePreview();
	displaySize();
});

// Listener when user click on Resize button
document.getElementById('btnResize').addEventListener('click', () => {
	const path = checkFile();
	const options = getOptions();

	if(path)
	{
		options.path = path;
		if(options.height === '' || options.width === '')
			alert('Please select a width and a height');
		else
			ipcRenderer.send('resize', options, 10);		
	}
	else
		alert('Please select an image to resize');
});

ipcRenderer.on('resize-reply', (event, arg) => {
	alert(arg);
})

const displaySize = (isNew = false) => {
	let image = document.getElementById('imagePreview');

	let width = image.width;
	let height = image.height;

	if(isNew)
	{
		console.log(width);
		if(width > 640)
		{
			let ratioToRezise = width / 640
			image.width = width / ratioToRezise;
			image.height = height / ratioToRezise;
		}
	}
	
	document.getElementById('width').value = image.width;
	document.getElementById('height').value = image.height;
}

// Resize preview image display
const resizePreview = () => {
	let width = document.getElementById('range').value;
	let image = document.getElementById('imagePreview');
	let ratio = image.width / width;

	if(width !== '')
	{
		image.width = width;
		image.height = image.height / ratio;
	}
	
}

// Display selected image in imagePreview div
const loadPreview = (e) => {
	var reader = new FileReader();
    reader.onload = (e) => {
        // get loaded data and render thumbnail.
		document.getElementById('imagePreview').src = e.target.result;
    };
    // read the image file as a data URL.
	reader.readAsDataURL(e.files[0]);
	document.getElementById('range').disabled = false;
}

// Return file path if exists or false
const checkFile = () => {
	let	file = document.querySelector('input[name="imageFile"]').files[0];
	if(file === undefined)
	return false;
	else
		return file.path;
	}

// Return file path if exists or false
const getOptions = () => {
	return { 
		width : document.getElementById('width').value,
		height: document.getElementById('height').value,
		border: document.querySelector('input[name="borderOptions"]:checked').value,
		color: document.getElementById('color').value,
		name: document.querySelector('input[name="imageFile"]').files[0].name
	};
}
