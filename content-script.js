const bookkeepingElementId = 'passwordIsCurrentlyRevealed632757'

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
	if(request.msg === 'revealPassword'){
		reveal()
	}
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
	if(request.msg === 'checkIfRevealed'){
		if(document.getElementById(bookkeepingElementId)){
			sendResponse({revealed: true})
		}
		else{
			sendResponse({revealed: false})
		}
	}
})

function reveal(){
	let passwordFields = document.querySelectorAll('input[type="password"]')
	for(let i=0; i<passwordFields.length; i++){
		passwordFields[i].setAttribute("type", "text")
	}

	//Create dummy element with unique ID & add to page if it hasn't been added. Used to "remember" icon states when switching between pages
	if(!document.getElementById(bookkeepingElementId)){
		let bookkeepingElement = document.createElement('span')
		bookkeepingElement.id = bookkeepingElementId
		document.getElementsByTagName('body')[0].appendChild(bookkeepingElement)
	}
}