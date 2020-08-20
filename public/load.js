"use strict";

var iframeEl = document.createElement("iframe");
function receiveMessage(event) {
	if (event.origin !== "http://localhost:3000") {
		return;
	}
	if (event.data.type === "UPDATE_IFRAM") {
		let styleData = event.data.values;
		iframeEl.style[styleData[0]] = styleData[1];
	}
	if (event.data.type === "LOCALSTORE_IFRAM") {
		switch (event.data.action) {
			case "remove": {
				localStorage.removeItem(event.data.key);
				break;
			}
			case "get": {
				window.parent.postMessage({ ...event.data, type: "GET_LOCALDATA" }, event.data.origin);
				break;
			}
			case "set": {
				localStorage.setItem(event.data.key, event.data.val);
				break;
			}
		}
	}
}
window.addEventListener("message", receiveMessage);
var origin = window.location.origin;
iframeEl.setAttribute("src", "http://localhost:3000?origin=" + origin + "&h=45d15632-a028-42f5-b9b7-672d289d2128&w=http://127.0.0.1:8080");
iframeEl.setAttribute("id", "avistaChatFrame");
iframeEl.style.display = "none";
iframeEl.style.border = "none";
iframeEl.style.position = "fixed";
iframeEl.style.bottom = "10px";
iframeEl.style.right = "10px";
iframeEl.style.height = "calc(100vh - 30%)";
iframeEl.className = "chat-frame";

document.body.append(iframeEl);
