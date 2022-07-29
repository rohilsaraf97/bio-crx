import { bionifyContent, deBionifyContent } from "./utils";

export const handleBionification = async (toggle: boolean) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  toggle
    ? await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: deBionifyContent,
      })
    : await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: bionifyContent,
      });
};
