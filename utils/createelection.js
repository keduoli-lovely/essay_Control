let span = 	document.createElement('span')

span.className = 'keduoli'
export const createFn = (text) => {
	span.textContent = text
	return span
}