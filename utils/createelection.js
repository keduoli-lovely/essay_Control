let span = 	document.createElement('span')
span.style.cssText = `
	position: absolute;
	bottom: -20px;
	left: 0;
	color: red;
	font-size: 18px;
	transform: scale(.6);
`
span.className = 'keduoli'
export const createFn = (text) => {
	span.textContent = text
	return span
}