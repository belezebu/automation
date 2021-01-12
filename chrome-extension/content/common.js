const $ = document.querySelector.bind(document);

const getElement = id => $(`#${id}`) || $(id);

const changeText = (id, text) => {
  const textBox = getElement(id)
  textBox.value = text
}

const changeCheckbox = (id) => {
  const checkBox = getElement(id)
  checkBox.value = 1
  if (checkBox.checked !== true) {
    checkBox.click()
  }
}

const changeSelection = (id, value) => {
  const selectInput = getElement(id)
  selectInput.value = value
}

const changeRadio = (id) => {
  const radioInput = getElement(id)
  radioInput.click()
}

const round = (value, multiplier = 100) => {
  return Math.round(value * multiplier) / multiplier
}