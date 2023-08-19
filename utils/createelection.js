let span = 	document.createElement('span')
span.style.cssText = `
	position: absolute;
	bottom: -6px;
	left: 30%;
	color: red;
	font-size: 12px;
	transform: scale(.6);
`
span.className = 'keduoli'
export const createFn = (text) => {
	span.textContent = text
	return span
}