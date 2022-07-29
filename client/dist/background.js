chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method == "getStatus") {
    console.log(request.data);
    sendResponse({ method: "peepee", data: "poopoo" });
  }
});
