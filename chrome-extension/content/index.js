// Add listener to the popup
chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "fillFormButton") {
      chrome.storage.local.get(['location'], fillInitialForm)
  }
  if (msg.action === "fillInvestmentButton"){
    chrome.storage.local.get(['location'], fillInvestmentsForm)
  }
});