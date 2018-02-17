//Reveal password when icon clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	revealPassword()
})

chrome.commands.onCommand.addListener(function(command) {
	if(command === 'revealPassword'){
		revealPassword()
	}
})

chrome.tabs.onActivated.addListener(()=>{
	chrome.browserAction.setIcon({path: "assets/icons/icon16.png"})
})

function revealPassword(){
	revealed = true
	chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
		chrome.tabs.sendMessage(
			tabs[0].id,
			{msg: 'revealPassword'}
		)
	})
	chrome.browserAction.setIcon({path: "assets/icons/icon-revealed.png"})
}