function calculateTotal({items, area}) {
  const { totalCost, vat } = items.reduce((acc, { totalCost, vat }) => {
    acc["totalCost"] = acc["totalCost"] + totalCost
    acc["vat"] = vat
    return acc
  }, { totalCost: 0, vat: 0 })
  const response = {
    vat,
    unitPrice: round(totalCost / area),
    quantity: area
  }
  return response
}

// Tutoragem
function calculateTutoragem({items}) {
  const total = items.reduce((acc, { unitCost, quantity, vat }) => {
    acc["unitPrice"] = acc["unitPrice"] + unitCost
    acc["quantity"] = quantity
    acc["vat"] = vat
    return acc
  }, { unitPrice: 0, quantity: 0})
  return total
}

// Plantas
function sumQuantity({items}) {
  const quantity = items.reduce((acc, { unitCost, quantity, vat }) => {
    acc["quantity"] = acc["quantity"] + quantity
    acc["unitPrice"] = unitCost
    acc["vat"] = vat
    return acc
  }, {  unitPrice: 0, quantity: 0 })
  return quantity
}

function fillItem({ dossierId, items, area } , calculateTotal ) {
  const { unitPrice, quantity, vat } = calculateTotal({ items, area })
  const formItem = mapDossierIdToInvestmentItem[dossierId]
  console.log('Filling Investment Item' , { dossierId, formItem })
  changeText(itemToInvestmentForm[formItem]['unitPrice']['id'], unitPrice)
  if (itemToInvestmentForm[formItem]['quantity']) {
    changeText(itemToInvestmentForm[formItem]['quantity']['id'], quantity)
  }
  changeText(itemToInvestmentForm[formItem]['vat']['id'], mapVatToForm[vat])
  changeText(itemToInvestmentForm[formItem]['investmentDate']['id'], itemToInvestmentForm[formItem]['investmentDate']['value'])
}

function fillInvestmentsForm({location: rawLocation}) {
  const location = JSON.parse(rawLocation)

  console.log('Starting to fill the investments', {location})

  const {area, items} = location

  Object.entries(items).forEach(([dossierId, items]) => {
    const investmentsFormId = mapDossierIdToInvestmentItem[dossierId]
    switch (investmentsFormId) {
      case investmentIds.COBERTURA_SOLO:
      case investmentIds.DESINFECCAO_SOLO:
      case investmentIds.DESPESAS_CONSOLIDACAO:
      case investmentIds.ESTEIOS_ARMACAO:
      case investmentIds.ESTRUTURA_DE_SUPORTE_CRUZETA:
      case investmentIds.ESTRUTURA_DE_SUPORTE_PERGOLA:
      case investmentIds.MAO_DE_OBRA:
      case investmentIds.ROLAGEM:
      case investmentIds.CONSTRUCAO_CAMALHOES:
      case investmentIds.ENRELVAMENTO_CULTURAS:
      case investmentIds.EQUIPAMENTO_REGA:
      case investmentIds.ESTRUTURA_ANTI_GEADA:
      case investmentIds.ESTRUTURA_ANTI_GRANIZO:
      case investmentIds.REDE_ANTI_PASSARO:
      case investmentIds.DESMATACAO:
      case investmentIds.SURRIBA:
      case investmentIds.MOBILIZACAO_CHISEL:
      case investmentIds.RIPAGEM:
      case investmentIds.DESPEDREGA:
      case investmentIds.ESCARIFICACAO:
      case investmentIds.GRADAGEM:
      case investmentIds.TERRACEAMENTO:
        fillItem({ dossierId, items, area}, calculateTotal)
        break;
      case investmentIds.TUTORAGEM:
        fillItem({ dossierId, items, area}, calculateTutoragem)
        break;
      case investmentIds.PLANTAS:
      case investmentIds.CASCA_DE_PINHEIRO:
      case investmentIds.SEMENTES:
      case investmentIds.SEMENTES_ENRELVAMENTO_CULTURAS:
      case investmentIds.ADUBO_FERTILIZACAO:
      case investmentIds.ADUBO_DISTRIBUICAO:
      case investmentIds.CORRETIVO_MINERAL_PH:
      case investmentIds.CALCARIO:
      case investmentIds.CALCARIO_DISTRIBUICAO:
      case investmentIds.MATERIA_ORGANICA:
      case investmentIds.MATERIA_ORGANICA_DISTRIBUICAO:
      case investmentIds.DRENAGEM:
        fillItem({ dossierId, items, area}, sumQuantity)
        break;
    }
  })
}
