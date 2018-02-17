let revealed = false	//keeps track of whether the password is currently shown or hidden

//Reveal password when icon clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	revealPassword()
})

chrome.commands.onCommand.addListener(function(command) {
	if(command === 'revealPassword'){
		revealPassword()
	}
})

function revealPassword(){
	revealed = true
	chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
		chrome.tabs.sendMessage(
			tabs[0].id,
			{msg: 'revealPassword'}
		)
	})
	if(revealed){
		chrome.browserAction.setIcon({path: "assets/icons/icon-revealed.png"})
	}
}