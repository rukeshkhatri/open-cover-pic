chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openCoverPic",
    title: "Open Cover Picture",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openCoverPic") {
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        function: extractAndOpenUrl,
      })
      .then((results) => {
        if (results[0].result.error) {
          chrome.tabs.sendMessage(tab.id, {
            message: results[0].result.error,
          });
        }
      });
  }
});


function extractAndOpenUrl() {
  const urlDiv = document.querySelectorAll(
    '[data-imgperflogname="profileCoverPhoto"]'
  );
  if (urlDiv.length > 0) {
    const url = urlDiv[0].src;
    if (url) {
      window.open(url, "_blank");
      return { error: null };
    } else {
      return { error: "Could not extract cover pic!" };
    }
  } else {
    return { error: "URL not supported!!" };
  }
}
