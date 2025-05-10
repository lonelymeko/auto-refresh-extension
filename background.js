let refreshInterval;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'refreshNow') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: refreshPage
      });
    });
  }
  else if (request.action === 'startRefresh') {
    if (refreshInterval) clearInterval(refreshInterval);
    
    refreshInterval = setInterval(() => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: refreshPage
        });
      });
    }, request.interval);
    
    chrome.action.setBadgeText({text: 'ON'});
  }
  else if (request.action === 'stopRefresh') {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = null;
    chrome.action.setBadgeText({text: ''});
  }
});

function refreshPage() {
  window.location.reload();
}