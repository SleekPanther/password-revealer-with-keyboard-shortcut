chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
	if(request.msg === 'revealPassword'){
		reveal()
	}
})

function reveal(){
	passwordFields = document.querySelectorAll('input[type="password"]')
	for(let i=0; i<passwordFields.length; i++){
		passwordFields[i].setAttribute("type", "text")
	}
}