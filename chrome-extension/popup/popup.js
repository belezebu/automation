const $ = document.querySelector.bind(document);
const getElement = id => $(`#${id}`) || $(id);

// Select your input type file and store it in a variable
const input = getElement('fileInput');
const dropdown = getElement('localDropdown');
const fillFormButton = getElement('fillFormButton');
const fillInvestmentButton = getElement('fillInvestmentButton');


function updateSelections({ locations }) {
  dropdown.innerHTML = locations.reduce((html, location) => {
    return html += `<option value="${location.number}"> ${location.name} </option>`
  }, "");
}

// Event handler executed when a file is selected
function onSelectFile() {
  // This will upload the file after having read it
  async function upload(file) {
    const formData = new FormData();
    formData.append(file.name, file);
    const baseUrl = 'http://localhost:8080/.netlify/functions/documents'
    //const baseUrl = 'https://peaceful-mirzakhani-e7f2ff.netlify.app/.netlify/functions/documents'
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: formData
    });

    const { locations, personalInformation } = await response.json();
    chrome.storage.local.set({result: JSON.stringify({locations, personalInformation})})
    updateSelections({ locations })
  };
  upload(input.files[0])
}

// Fill the form
function saveLocation() {
  function groupByDossierId(items) {
    function groupBy(items, key) {
      return items.reduce((group, item) => {
        (group[item[key]] = group[item[key]] || []).push(item);
        return group;
      }, {});
    };
    return  groupBy(items, 'dossierId')
  }

  function fillFormEvent({result}) {
    const {locations} = JSON.parse(result)
    if (!locations) {
      chrome.extension.getBackgroundPage().console.error('Choose a file first')
      return
    }
    const chosenLocationNumber = dropdown.value
    const chosenLocation = locations.find(({number}) => number === chosenLocationNumber)
    const itemsByDossierId = groupByDossierId(chosenLocation.items)

    chrome.storage.local.set({location: JSON.stringify({...chosenLocation, items: itemsByDossierId})})
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: fillFormButton.id});
    });
  }
  chrome.storage.local.get(["result"], fillFormEvent)
};

// Trigger the fill investment button
function fillInvestment(){
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: fillInvestmentButton.id});
  });
}


// Restores select box stored in chrome.storage
function restoreSelections() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get(['result'],
    function ( { result }) {
      const { locations = [] } = result && JSON.parse(result) || {}
      updateSelections({locations})
    }
  );
}

// Add a listener on your input
// It will be triggered when a file will be selected
input.addEventListener('change', onSelectFile, false);

// Add a listener on your input
// It will be triggered when a fill form button is clicked
fillFormButton.addEventListener('click', saveLocation, false);

// Add a listener on your input
// It will be triggered when a fill form button is clicked
fillInvestmentButton.addEventListener('click', fillInvestment, false);

// Restore available selections
document.addEventListener("DOMContentLoaded", restoreSelections);