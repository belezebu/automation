
/**


*/


/* Definições da plantação

15 - 16 - 17 - Fertilização
N/A - Rega

29 - Correção do solo - buscar a quantidade / 1000
22 - Desmatação
26 - Despedrega
33 - Drenagem
27 - Escarificação
32 - Gradagem
24 - Lavoura profunda
30 - Matéria orgânica - buscar a quantidade
25 - Ripagem cruzada
23 - Surriba
34 - Terraceamento

19 - 20 - 21 Estrutura anti-granizo/anti-geada



*/

/*
Se existir rega,
m3 = area * 4000
 */


/* INVESTIMENTOS
1 - Cobertura do solo - custo total / area -
2 - Desinfecção solo - custo total / area -
3 - Despesas de consolidação - custo / area - area -
4 - Esteios/Aramação - (custo / area) - area
5 - Estrutura de suporte - Cruzeta - custo total / area
6 - Estrutura de suporte - Pérgola - custo total / area
7 - Mão de Obra (plantação propriamente dita) - (custo / area) + (custo / area )  - area -
8 - Plantas - unitPrice - quantidade
9 - Tutoragem - ( unitprice + unitprice ) - quantidade só de um
10 - Casca de pinheiro - unitprice - quantidade
11 - Sementes - unitprice - quantidade
12 - Rolagem - custo total / area
13 - Construção de camalhões - custo total / area
14 - Enrelvamento de culturas permanentes - custo total / area
15 - Sementes para enrelvamento de culturas permanentes - unitprice - quantidade
16 - Adubo - Fertilização de fundo - unitPrice - quantidade
17 - Adubo - Distribuição - unitPrice - quantidade
18 - Corretivo mineral de pH - unitPrice - quantidade
19 - Equipamento de rega - Gota-a-gota -  custo total / area
20 - Estrutura anti-geada - custo total / area
21 - Estrutura anti-granizo - custo total / area
22 - Rede anti-pássaro - custo total / area
23 - Desmatação - custo total / area
24 - Surriba - custo total / area
25 - Mobilização com chisel - custo total / area
26 - Ripagem - custo total / area
27 - Despedrega - custo total / area
28 - Escarificação - custo total / area
29 - Calcário - distribuição - unitPrice - quantidade
30 - Calcário - melhoria da fertilidade do solo -
31 - Matéria orgânica - unitPrice - quantidade
32 - Matéria orgânica - Distribuição -
33 - Gradagem - custo total / area
34 - Drenagem - unitPrice - quantidade
35 - Terraceamento - custo total / area

Datas

[1 - 15] - 2021-03-01
[16 , 22] - 2021-03-01
[ 23, 27 ] { 34, 35 } - 2021-02-01
28 - 33 - 2021-03-01

19 - 2021-04-01

*/

function fillItem( { dossierId, itemPrice, quantity, vat }) {
  const formItem = mapDossierIdToFormItem[dossierId]
  changeText(itemToInvestmentForm[formItem]['unitPrice']['id'], itemPrice)
  if(itemToInvestmentForm[formItem]['quantity']){
    changeText(itemToInvestmentForm[formItem]['quantity']['id'], quantity)
  }
  changeText(itemToInvestmentForm[formItem]['vat']['id'], mapVatToForm[vat])
  changeText(itemToInvestmentForm[formItem]['investmentDate']['id'], itemToInvestmentForm[formItem]['investmentDate']['value'])
}

function fillFieldWork( { dossierId, items, area } ) {
  const { totalCost, vat } = items.reduce( (acc, { totalCost, vat}) => {
    acc.totalCost = acc.totalCost + (totalCost / area )
    acc.vat = vat
    return acc
  }, { totalCost: 0, vat: 0})

  fillItem({ dossierId, itemPrice: totalCost, vat})
}

function fillField( { dossierId, items, area }) {
  const { unitCost: itemPrice, vat , quantity} = items[0]
  fillItem( { dossierId, itemPrice, quantity, vat })
}


function fillInvestmentsForm({location}) {
  const {number, name, type, isNew, plantType, slope, watering, area, items} = JSON.parse(location)
  console.log('Filling investment form', {number, name, type, isNew, plantType, slope, watering, area, items})
  Object.entries(items).forEach(([dossierId, items]) => {
    switch (dossierId) {
      case "10":
        fillFieldWork({ dossierId, area, items})
        break;
      case "11":
      case "12":
      case "13":
      case "16":
      case "19":
        fillField({ dossierId, area, items})
        break;
    }
  })

}


/*

designation: "Abertura de valas de plantação"
dossierId: "10"
quantity: 6
totalCost: 240
totalCostWithVat: 254.4
unit: "hora"
unitCost: 40
vat: 6
 */



