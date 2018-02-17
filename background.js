//Reveal password when extension icon clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	revealPassword()
})

chrome.commands.onCommand.addListener(function(command) {
	if(command === 'revealPassword'){
		revealPassword()
	}
})

//on tab switch
chrome.tabs.onActivated.addListener(()=>{
	changeIconToDefault()
})

//on refresh page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
	changeIconToDefault()
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

function changeIconToDefault(){
	chrome.browserAction.setIcon({path: "assets/icons/icon16.png"})
}