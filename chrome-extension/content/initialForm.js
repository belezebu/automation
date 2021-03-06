function getDensity({area, items}) {
  const plantsNumber = items[8][0].quantity
  return Math.floor(plantsNumber / area)
}

function fillAgricultureType({isNew, watering}) {
  if (isNew) {
    changeRadio(locationInformationToFormOption[locationProperties.TIPO_DE_AGRICULTURA]['after']['radioInput'][watering ? WATERING : NO_WATERING]['id'])
  } else {
    changeRadio(locationInformationToFormOption[locationProperties.TIPO_DE_AGRICULTURA]['before']['radioInput'][NO_WATERING]['id'])
    changeRadio(locationInformationToFormOption[locationProperties.TIPO_DE_AGRICULTURA]['after']['radioInput'][watering ? WATERING : NO_WATERING]['id'])
  }
}

function fillWatering({watering, area, waterCounters, waterCatchment}) {
  if (watering) {
    changeSelection(locationInformationToFormOption[locationProperties.SISTEMA_REGA]['selectInput']["id"], GOTEJADORES_AUTOCOMPENSANTES)
    changeText(locationInformationToFormOption[locationProperties.CONSUMO_ANO]['input']["id"], area * GOTEJADORES_CONSUMO_ANO)
    changeText(locationInformationToFormOption[locationProperties.NUMERO_CONTADORES]['input']["id"], waterCounters)
    changeText(locationInformationToFormOption[locationProperties.NUMERO_CAPTACOES]['input']["id"], waterCatchment)
    changeCheckbox(itemToFormOption[locationSettings.REGA]["checkInput"]["id"])
  }
}

function fillDensity({isNew, items, area}) {
  if (isNew && items[8]) {
    changeText(locationInformationToFormOption[locationProperties.DENSIDADE]['input']['id'], getDensity({items, area}))
  }
}

function fillLocationInformation({isNew, plantType, slope, watering, area, items, waterCounters, waterCatchment, plantationYear}) {
  changeText(locationInformationToFormOption["DECLIVE_TERRENO"]['input']['id'], slope)
  changeSelection(locationInformationToFormOption[locationProperties.TIPO_DE_HORIZONTE]['selectInput']['id'], isNew ? TIPO_DE_HORIZONTE.COM_HORIZONTES_COMPACTOS_OU_DUROS : TIPO_DE_HORIZONTE.SEM_HORIZONTES_COMPACTOS_OU_DUROS)
  changeText(locationInformationToFormOption[locationProperties.AREA]['input']['id'], area.toFixed(3))
  changeSelection(locationInformationToFormOption[locationProperties.ESPECIE]['selectInput']['id'], plantTypeToValue[plantType])
  fillDensity({isNew, items, area})
  changeRadio(locationInformationToFormOption[locationProperties.NOVA_PLANTACAO]['radioInput'][isNew ? "yes" : "no"]["id"])
  changeText(locationInformationToFormOption[locationProperties.ANO_PLANTACAO]['input']['id'], plantationYear)
  fillAgricultureType({isNew, watering})
  changeText(locationInformationToFormOption[locationProperties.AREA_REGADA]['input']['id'], area.toFixed(3))
  fillWatering({watering, area, waterCounters, waterCatchment})
}

function fillItemsInformation({items: investmentItemsById, area}) {
  function fillItem(area, formId) {
    changeCheckbox(itemToFormOption[formId].checkInput.id)
    changeText(itemToFormOption[formId].areaInput.id, area.toFixed(3))
  }

  function fillItemQuantity({items, area, formId}, mapper) {
    fillItem(area, formId)
    const quantity = items.reduce((acc, {quantity}) => {
      return acc + mapper(quantity)
    }, 0)
    changeText(itemToFormOption[formId].quantityInput.id, quantity.toFixed(3))
  }

  Object.entries(investmentItemsById).forEach(([dossierId, items]) => {
    const formId = mapDossierIdToSettingsFormId[dossierId]
    console.log('Filling Form Item' , { dossierId, formId })
    switch (formId) {
      case locationSettings.FERTILIZACAO:
      case locationSettings.DESMATACAO:
      case locationSettings.DESPEDREGA:
      case locationSettings.DRENAGEM:
      case locationSettings.ESCARIFICAO:
      case locationSettings.GRADAGEM:
      case locationSettings.LAVOURA:
      case locationSettings.RIPAGEM_CRUZADA:
      case locationSettings.SURRIBA:
      case locationSettings.TERRACEAMENTO:
      case locationSettings.ESTRUTURA_ANTI_GRANIZO_GEADA:
        fillItem(area, formId)
        break;
      case locationSettings.CORRECAO_SOLO:
        fillItemQuantity({items, area, formId}, function (quantity) {
          return round(quantity / 1000)
        })
        break;
      case locationSettings.MATERIA_ORGANICA:
        fillItemQuantity({items, area, formId}, function (quantity) {
          return quantity
        })
        break;
    }
  })
}

function fillInitialForm({location: rawLocation}) {
  const location = JSON.parse(rawLocation)
  console.log('Starting to fill the location information', { location})
  fillLocationInformation(location)
  fillItemsInformation(location)
}