document.getElementById('refreshNow').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'refreshNow' });
  window.close();
});

document.getElementById('startRefresh').addEventListener('click', () => {
  const timeValue = document.getElementById('timeValue').value;
  const timeUnit = document.getElementById('timeUnit').value;
  const milliseconds = timeValue * timeUnit;
  
  chrome.runtime.sendMessage({ 
    action: 'startRefresh',
    interval: milliseconds
  });
  window.close();
});

document.getElementById('stopRefresh').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'stopRefresh' });
  window.close();
});