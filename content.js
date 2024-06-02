chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message) {
    showErrorPopup(request.message);
  }
});

function showErrorPopup(message) {
  const errorPopup = document.createElement('div');
  errorPopup.style.position = 'fixed';
  errorPopup.style.bottom = '10px';
  errorPopup.style.right = '10px';
  errorPopup.style.padding = '10px';
  errorPopup.style.backgroundColor = '#4b4b4b';
  errorPopup.style.color = 'white';
  errorPopup.style.zIndex = '1000';
  errorPopup.style.borderRadius = '5px';
  errorPopup.textContent = "FB Cover Pic Extension: "+message;

  document.body.appendChild(errorPopup);

  setTimeout(() => {
    document.body.removeChild(errorPopup);
  }, 3000);
}
