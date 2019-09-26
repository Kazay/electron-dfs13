var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: '7+'});
const { remote } = require('electron');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  } 
  
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const run = () => {
	const src = remote.app.getAppPath()+'/test.jpg';
	const dst = remote.app.getAppPath()+'/test-thumbnail.png';
	console.log(src, dst);
	gm(src).crop(240, 240).write(dst, (err) => {
 		if (!err) console.log('done');
		else console.log(err);
	});
}

window.addEventListener('DOMContentLoaded', run);