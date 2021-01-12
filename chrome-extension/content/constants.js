const NO_WATERING = 'sequeiro'
const WATERING = 'regadio'
const GOTEJADORES_AUTOCOMPENSANTES = "16"
const GOTEJADORES_CONSUMO_ANO = 4000

const TIPO_DE_HORIZONTE = {
  COM_HORIZONTES_COMPACTOS_OU_DUROS: "1",
  SEM_HORIZONTES_COMPACTOS_OU_DUROS: "2"
}

const locationProperties = {
  "DECLIVE_TERRENO": "DECLIVE_TERRENO",
  "TIPO_DE_HORIZONTE": "TIPO_DE_HORIZONTE",
  "AREA": "AREA",
  "ESPECIE": "ESPECIE",
  "DENSIDADE": "DENSIDADE",
  "NOVA_PLANTACAO": "NOVA_PLANTACAO",
  "ANO_PLANTACAO": "ANO_PLANTACAO",
  "TIPO_DE_AGRICULTURA": "TIPO_DE_AGRICULTURA",
  "AREA_REGADA": "AREA_REGADA",
  "SISTEMA_REGA": "SISTEMA_REGA",
  "NUMERO_CONTADORES": "NUMERO_CONTADORES",
  "NUMERO_CAPTACOES": "NUMBERO_CAPTACOES",
  "CONSUMO_ANO": "CONSUMO_ANO"
}

const locationSettings = {
  "FERTILIZACAO": "FERTILIZACAO",
  "REGA": "REGA",
  "CORRECAO_SOLO": "CORRECAO_SOLO",
  "DESMATACAO": "DESMATACAO",
  "DESPEDREGA": "DESPEDREGA",
  "DRENAGEM": "DRENAGEM",
  "ESCARIFICAO": "ESCARIFICAO",
  "GRADAGEM": "GRADAGEM",
  "LAVOURA": "LAVOURA",
  "MATERIA_ORGANICA": "MATERIA_ORGANICA",
  "RIPAGEM_CRUZADA": "RIPAGEM_CRUZADA",
  "SURRIBA": "SURRIBA",
  "TERRACEAMENTO": "TERRACEAMENTO",
  "ESTRUTURA_ANTI_GRANIZO_GEADA": "ESTRUTURA_ANTI_GRANIZO_GEADA",
}

const mapDossierIdToSettingsFormId = {
  "15": locationSettings.FERTILIZACAO,
  "16": locationSettings.FERTILIZACAO,
  "17": locationSettings.FERTILIZACAO,
  "30": locationSettings.CORRECAO_SOLO,
  "23": locationSettings.DESMATACAO,
  "27": locationSettings.DESPEDREGA,
  "34": locationSettings.DRENAGEM,
  "28": locationSettings.ESCARIFICAO,
  "33": locationSettings.GRADAGEM,
  "25": locationSettings.LAVOURA,
  "31": locationSettings.MATERIA_ORGANICA,
  "26": locationSettings.RIPAGEM_CRUZADA,
  "24": locationSettings.SURRIBA,
  "35": locationSettings.TERRACEAMENTO,
  "20": locationSettings.ESTRUTURA_ANTI_GRANIZO_GEADA,
  "21": locationSettings.ESTRUTURA_ANTI_GRANIZO_GEADA,
  "22": locationSettings.ESTRUTURA_ANTI_GRANIZO_GEADA,
}

const locationInformationToFormOption = {
  [locationProperties.DECLIVE_TERRENO]: {
    input: {
      id: "projecto_plantacao_declive_terreno"
    }
  },
  [locationProperties.TIPO_DE_HORIZONTE]: {
    selectInput: {
      id: "projecto_plantacao_tbc_tipo_solo_id"
    }
  },
  [locationProperties.AREA]: {
    input: {
      id: "projecto_plantacao_area_total"
    }
  },
  [locationProperties.ESPECIE]: {
    selectInput: {
      id: "projecto_plantacao_tbc_especie_plantacao_id"
    }
  },
  [locationProperties.DENSIDADE]: {
    input: {
      id: "projecto_plantacao_densidade_plantacao"
    }
  },
  [locationProperties.NOVA_PLANTACAO]: {
    radioInput: {
      yes: {
        id: "nova_plantacao_sim"
      },
      no: {
        id: "nova_plantacao_nao"
      },
    }
  },
  [locationProperties.ANO_PLANTACAO]: {
    input: {
      id: "projecto_plantacao_ano_plantacao"
    }
  },
  [locationProperties.TIPO_DE_AGRICULTURA]: {
    before: {
      radioInput: {
        sequeiro: {
          id: "plantacao_existente_tbc_classe_sector_tipologia_id_sequeiro"
        },
        regadio: {
          id: "plantacao_existente_tbc_classe_sector_tipologia_id_regadio"
        },
      },
    },
    after: {
      radioInput: {
        sequeiro: {
          id: "plantacao_nova_tbc_classe_sector_tipologia_id_sequeiro"
        },
        regadio: {
          id: "plantacao_nova_tbc_classe_sector_tipologia_id_regadio"
        },
      }
    }
  },
  [locationProperties.AREA_REGADA]: {
    input: {
      id: "projecto_plantacao_area_rega"
    }
  },
  [locationProperties.SISTEMA_REGA]: {
    selectInput: {
      id: "projecto_plantacao_tbc_sistema_rega_depois_id"
    },
  },
  [locationProperties.NUMERO_CONTADORES]: {
    input: {
      id: "projecto_plantacao_novos_contadores"
    }
  },
  [locationProperties.NUMERO_CAPTACOES]: {
    input: {
      id: "projecto_plantacao_nr_novas_captacoes"
    }
  },
  [locationProperties.CONSUMO_ANO]: {
    input: {
      id: "projecto_plantacao_consumo_previsto_anual"
    }
  }
}

const itemToFormOption = {
  [locationSettings.FERTILIZACAO]: {
    checkInput: {
      id: "projecto_plantacao_fertilizacao"
    },
    areaInput: {
      id: "projecto_plantacao_area_fertilizacao"
    }
  },
  [locationSettings.REGA]: {
    checkInput: {
      id: "projecto_plantacao_rega"
    }
  },
  [locationSettings.CORRECAO_SOLO]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_correcao_solo"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_correcao_solo"
    },
    quantityInput: {
      id: "projecto_plantacao_preparacao_terreno_valor_fator_correcao_solo"
    },
  },
  [locationSettings.DESMATACAO]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_desmatacao"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_desmatacao"
    }
  },
  [locationSettings.DESPEDREGA]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_despedrega"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_despedrega"
    }
  },
  [locationSettings.DRENAGEM]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_drenagem"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_drenagem"
    }
  },
  [locationSettings.ESCARIFICAO]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_escarificacao"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_escarificacao"
    }
  },
  [locationSettings.GRADAGEM]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_gradagem"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_gradagem"
    }
  },
  [locationSettings.LAVOURA]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_lavoura_profunda"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_lavoura_profunda"
    }
  },
  [locationSettings.MATERIA_ORGANICA]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_materia_organica"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_materia_organica"
    },
    quantityInput: {
      id: "projecto_plantacao_preparacao_terreno_valor_fator_materia_organica"
    }
  },
  [locationSettings.RIPAGEM_CRUZADA]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_ripagem_cruzada"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_ripagem_cruzada"
    }
  },
  [locationSettings.SURRIBA]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_surriba"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_surriba"
    }
  },
  [locationSettings.TERRACEAMENTO]: {
    checkInput: {
      id: "projecto_plantacao_preparacao_terreno_terraceamento"
    },
    areaInput: {
      id: "projecto_plantacao_preparacao_terreno_area_terraceamento"
    }
  },
  [locationSettings.ESTRUTURA_ANTI_GRANIZO_GEADA]: {
    checkInput: {
      id: "projecto_plantacao_estrutura_anti_granizo"
    },
    areaInput: {
      id: "projecto_plantacao_area_estrutura_anti_granizo"
    }
  },
}

const plantTypeToValue = {
  Alfarrobeira: "2",
  Amendoeira: "6",
  Aveleira: "2",
  Castanheiro: "15",
  Nogueira: "46",
  "Pinheiro Manso": "56",
  Pistachio: "205"
}

const investmentIds = {
  "COBERTURA_SOLO": "COBERTURA_SOLO",
  "DESINFECCAO_SOLO":  "DESINFECCAO_SOLO",
  "DESPESAS_CONSOLIDACAO": "DESPESAS_CONSOLIDACAO",
  "ESTEIOS_ARMACAO": "ESTEIOS_ARMACAO",
  "ESTRUTURA_DE_SUPORTE_CRUZETA": "ESTRUTURA_DE_SUPORTE_CRUZETA",
  "ESTRUTURA_DE_SUPORTE_PERGOLA": "ESTRUTURA_DE_SUPORTE_PERGOLA",
  "MAO_DE_OBRA": "MAO_DE_OBRA",
  "PLANTAS": "PLANTAS",
  "TUTORAGEM":"TUTORAGEM",
  "CASCA_DE_PINHEIRO": "CASCA_DE_PINHEIRO",
  "SEMENTES":"SEMENTES",
  "ROLAGEM":"ROLAGEM",
  "CONSTRUCAO_CAMALHOES": "CONSTRUCAO_CAMALHOES",
  "ENRELVAMENTO_CULTURAS": "ENRELVAMENTO_CULTURAS",
  "SEMENTES_ENRELVAMENTO_CULTURAS": "SEMEENTES_ENRELVAMENTO_CULTURAS",
  "ADUBO_FERTILIZACAO":"ADUBO_FERTILIZACAO",
  "ADUBO_DISTRIBUICAO":"ADUBO_DISTRIBUICAO",
  "CORRETIVO_MINERAL_PH": "CORRETIVO_MINERAL_PH",
  "EQUIPAMENTO_REGA":"EQUIPAMENTO_REGA",
  "ESTRUTURA_ANTI_GEADA": "ESTRUTURA_ANTI_GEADA",
  "ESTRUTURA_ANTI_GRANIZO": "ESTRUTURA_ANTI_GRANIZO",
  "REDE_ANTI_PASSARO": "REDE_ANTI_PASSARO",
  "DESMATACAO":"DESMATACAO",
  "SURRIBA":"SURRIBA",
  "MOBILIZACAO_CHISEL":"MOBILIZACAO_CHISEL",
  "RIPAGEM": "RIPAGEM",
  "DESPEDREGA":"DESPEDREGA",
  "ESCARIFICACAO":"ESCARIFICACAO",
  "DESPEDREGA": "DESPEDREGA",
  "CALCARIO_DISTRIBUICAO": "CALCARIO_DISTRIBUICAO",
  "CALCARIO": "CALCARIO",
  "MATERIA_ORGANICA": "MATERIA_ORGANICA",
  "MATERIA_ORGANICA_DISTRIBUICAO": "MATERIA_ORGANICA_DISTRIBUICAO",
  "GRADAGEM":"GRADAGEM",
  "DRENAGEM": "DRENAGEM",
  "TERRACEAMENTO": "TERRACEAMENTO"
}

const mapVatToForm = {
  "0": "4",
  "6": "1",
  "13": "3",
  "23": "2"
}

const mapDossierIdToInvestmentItem = {
  "1": investmentIds.COBERTURA_SOLO,
  "2": investmentIds.DESINFECCAO_SOLO,
  "3": investmentIds.DESPESAS_CONSOLIDACAO,
  "4": investmentIds.ESTEIOS_ARMACAO,
  "5": investmentIds.ESTRUTURA_DE_SUPORTE_CRUZETA,
  "6": investmentIds.ESTRUTURA_DE_SUPORTE_PERGOLA,
  "7": investmentIds.MAO_DE_OBRA,
  "8": investmentIds.PLANTAS,
  "9": investmentIds.TUTORAGEM,
  "10": investmentIds.CASCA_DE_PINHEIRO,
  "11": investmentIds.SEMENTES,
  "12": investmentIds.ROLAGEM,
  "13": investmentIds.CONSTRUCAO_CAMALHOES,
  "14": investmentIds.ENRELVAMENTO_CULTURAS,
  "15": investmentIds.SEMENTES_ENRELVAMENTO_CULTURAS,
  "16": investmentIds.ADUBO_FERTILIZACAO,
  "17": investmentIds.ADUBO_DISTRIBUICAO,
  "18": investmentIds.CORRETIVO_MINERAL_PH,
  "19": investmentIds.EQUIPAMENTO_REGA,
  "20": investmentIds.ESTRUTURA_ANTI_GEADA,
  "21": investmentIds.ESTRUTURA_ANTI_GRANIZO,
  "22": investmentIds.REDE_ANTI_PASSARO,
  "23": investmentIds.DESMATACAO,
  "24": investmentIds.SURRIBA,
  "25": investmentIds.MOBILIZACAO_CHISEL,
  "26": investmentIds.RIPAGEM,
  "27": investmentIds.DESPEDREGA,
  "28": investmentIds.ESCARIFICACAO,
  "29": investmentIds.CALCARIO_DISTRIBUICAO,
  "30": investmentIds.CALCARIO,
  "31": investmentIds.MATERIA_ORGANICA,
  "32": investmentIds.MATERIA_ORGANICA_DISTRIBUICAO,
  "33": investmentIds.GRADAGEM,
  "34": investmentIds.DRENAGEM,
  "35": investmentIds.TERRACEAMENTO,
}


const itemToInvestmentForm = {
  [investmentIds.COBERTURA_SOLO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_87"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_87_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_87_",
      value: "2021-03-01"
    }
  },
  [investmentIds.DESINFECCAO_SOLO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_88_"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_88_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_88_",
      value: "2021-03-01"
    }
  },
  [investmentIds.DESPESAS_CONSOLIDACAO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_91_"
    },
    quantity: {
      id: "quantidade_91"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_91_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_91_",
      value: "2021-03-01"
    }
  },
  [investmentIds.ESTEIOS_ARMACAO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_95"
    },
    quantity: {
      id: "quantidade_95"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_95_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_95_",
      value: "2021-03-01"
    }
  },
  [investmentIds.ESTRUTURA_DE_SUPORTE_CRUZETA]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_98"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_98_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_98_",
      value: "2021-03-01"
    }
  },
  [investmentIds.ESTRUTURA_DE_SUPORTE_PERGOLA]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_99"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_99_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_99_",
      value: "2021-03-01"
    }
  },
  [investmentIds.MAO_DE_OBRA]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_111"
    },
    quantity: {
      id: "quantidade_111"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_111_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_111_",
      value: "2021-03-01"
    }
  },
  [investmentIds.PLANTAS]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_112"
    },
    quantity: {
      id: "quantidade_112"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_112_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_112_",
      value: "2021-03-01"
    }
  },
  [investmentIds.TUTORAGEM]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_123"
    },
    quantity: {
      id: "quantidade_123"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_123_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_123_",
      value: "2021-03-01"
    }
  },
  [investmentIds.CASCA_DE_PINHEIRO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_839"
    },
    quantity: {
      id: "quantidade_839"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_839_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_839_",
      value: "2021-03-01"
    }
  },
  [investmentIds.SEMENTES]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_114"
    },
    quantity: {
      id: "quantidade_114"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_114_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_114_",
      value: "2021-03-01"
    }
  },
  [investmentIds.ROLAGEM]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_2505"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_2505_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_2505_",
      value: "2021-03-01"
    }
  },
  [investmentIds.CONSTRUCAO_CAMALHOES]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_2507"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_2507_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_2507_",
      value: "2021-03-01"
    }
  },
  [investmentIds.ENRELVAMENTO_CULTURAS]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_93"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_93_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_93_",
      value: "2021-03-01"
    }
  },
  [investmentIds.SEMENTES_ENRELVAMENTO_CULTURAS]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_115"
    },
    quantity: {
      id: "quantidade_115"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_115_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_115_",
      value: "2021-03-01"
    }
  },
  [investmentIds.ADUBO_FERTILIZACAO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_84"
    },
    quantity: {
      id: "quantidade_84"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_84_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_84_",
      value: "2021-03-01"
    }
  },
  [investmentIds.ADUBO_DISTRIBUICAO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_2504"
    },
    quantity: {
      id: "quantidade_2504"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_2504_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_2504_",
      value: "2021-03-01"
    }
  },
  [investmentIds.CORRETIVO_MINERAL_PH]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_2759"
    },
    quantity: {
      id: "quantidade_2759"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_2759_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_2759_",
      value: "2021-03-01"
    }
  },
  [investmentIds.EQUIPAMENTO_REGA]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_2512"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_2512_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_2512_",
      value: "2021-04-01"
    }
  },
  [investmentIds.ESTRUTURA_ANTI_GEADA]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_96"
    },
    quantity: {
      id: "quantidade_96"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_96_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_96_",
      value: "2021-03-01"
    }
  },
  [investmentIds.ESTRUTURA_ANTI_GRANIZO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_97"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_97_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_97_",
      value: "2021-03-01"
    }
  },
  [investmentIds.REDE_ANTI_PASSARO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_2041"
    },
    quantity: {
      id: "quantidade_2041"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_2041_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_2041_",
      value: "2021-03-01"
    }
  },
  [investmentIds.DESMATACAO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_89"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_89_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_89_",
      value: "2021-02-01"
    }
  },
  [investmentIds.SURRIBA]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_2459"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_2459_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_2459_",
      value: "2021-02-01"
    }
  },
  [investmentIds.MOBILIZACAO_CHISEL]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_104"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_104_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_104_",
      value: "2021-02-01"
    }
  },
  [investmentIds.RIPAGEM]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_113"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_113_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_113_",
      value: "2021-02-01"
    }
  },
  [investmentIds.DESPEDREGA]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_90"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_90_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_90_",
      value: "2021-02-01"
    }
  },
  [investmentIds.ESCARIFICACAO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_94"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_94_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_94_",
      value: "2021-03-01"
    }
  },
  [investmentIds.CALCARIO_DISTRIBUICAO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_2529"
    },
    quantity: {
      id: "quantidade_2529"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_2529_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_2529_",
      value: "2021-03-01"
    }
  },
  [investmentIds.CALCARIO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_86"
    },
    quantity: {
      id: "quantidade_86"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_86_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_86_",
      value: "2021-03-01"
    }
  },
  [investmentIds.MATERIA_ORGANICA]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_103"
    },
    quantity: {
      id: "quantidade_103"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_103_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_103_",
      value: "2021-03-01"
    }
  },
  [investmentIds.MATERIA_ORGANICA_DISTRIBUICAO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_2760"
    },
    quantity: {
      id: "quantidade_2760"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_2760_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_2760_",
      value: "2021-03-01"
    }
  },
  [investmentIds.GRADAGEM]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_100"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_100_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_100_",
      value: "2021-03-01"
    }
  },
  [investmentIds.DRENAGEM]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_92"
    },
    quantity: {
      id: "quantidade_92"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_92_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_92_",
      value: "2021-02-01"
    }
  },
  [investmentIds.TERRACEAMENTO]: {
    unitPrice: {
      id: "projecto_plantacao_custo_simplificado_rubricas_valor_unitario_declarado_117"
    },
    vat: {
      id: "projecto_plantacao_custo_simplificado_rubricas_tbc_taxa_iva_id_117_"
    },
    investmentDate: {
      id: "projecto_plantacao_custo_simplificado_rubricas_data_prevista_realizacao_117_",
      value: "2021-02-01"
    }
  },
}

