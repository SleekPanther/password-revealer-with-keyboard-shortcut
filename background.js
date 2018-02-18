const defaultIconPath = 'assets/icons/icon16.png'
const revealedIconPath = 'assets/icons/icon-revealed.png'

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
	checkIfRevealedAndChangeIcon()
})

//on page refresh
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
	checkIfRevealedAndChangeIcon()
})

function revealPassword(){
	revealed = true
	chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
		chrome.tabs.sendMessage(
			tabs[0].id,
			{msg: 'revealPassword'}
		)
	})
	setIcon(revealedIconPath)
}

function checkIfRevealedAndChangeIcon(){
	chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
		chrome.tabs.sendMessage(
			tabs[0].id,
			{msg: 'checkIfRevealed'},
			(response)=>{
				if(response && response.revealed){
					setIcon(revealedIconPath)
				}
				else{
					setIcon(defaultIconPath)
				}
			}
		)
	})

}

function setIcon(path){
	chrome.browserAction.setIcon({path: path})
}