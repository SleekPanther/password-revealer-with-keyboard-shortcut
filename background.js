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
	chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
		chrome.tabs.sendMessage(
			tabs[0].id,
			{msg: 'revealPassword'}
		)
	})
}