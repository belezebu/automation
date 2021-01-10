const $ = document.querySelector.bind(document);

const getElement = id => $(`#${id}`) || $(id);

const changeText = (id, text) => {
  const textBox = getElement(id)
  textBox.value = text
  textBox.click()
}

const changeCheckbox = (id) => {
  const checkBox = getElement(id)
  checkBox.value = 1
  if(checkBox.checked !== true){
    checkBox.click()
  }
}