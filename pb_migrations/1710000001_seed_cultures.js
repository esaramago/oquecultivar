/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const culturesColl = app.findCollectionByNameOrId("cultures");
  const schedulesColl = app.findCollectionByNameOrId("culture_schedules");

  // Agroclimatic regions in Portugal (from src/lib/config.ts):
  // 1: Litoral norte e centro (Viana do Castelo, Braga, Porto, Aveiro, Coimbra, Leiria)
  // 2: Interior norte e serras (Vila Real, Bragança, Guarda, Viseu)
  // 3: Lisboa, Setúbal e Vale do Tejo (Lisboa, Setúbal, Santarém)
  // 4: Alentejo e Beira Baixa (Portalegre, Évora, Beja, Castelo Branco)
  // 5: Algarve (Faro)
  // 6: Madeira e Açores (Regiões autónomas)

  const culturesData = [
    // ==========================================
    // FOLHA (Leafy greens)
    // ==========================================
    {
      name: "Alface",
      variant: "Quatro Estações",
      type: "folha",
      slug: "alface-quatro-estacoes",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["3", "4", "5", "6", "7", "8", "9", "10"] },
        { action: "direct_sowing", regions: ["2"], months: ["4", "5", "6", "7", "8", "9"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
        { action: "nursery", regions: ["2"], months: ["2", "3", "4", "5", "6", "7"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "6", "7", "8", "9", "10"] },
        { action: "plant", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["4", "5", "6", "7", "8", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7", "8", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] }
      ]
    },
    {
      name: "Alface",
      variant: "Rainha de Maio",
      type: "folha",
      slug: "alface-rainha-de-maio",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["1", "2", "3", "4", "8", "9"] },
        { action: "nursery", regions: ["2"], months: ["2", "3", "4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3", "9", "10", "11"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["3", "4", "5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["1", "2", "3", "4", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["4", "5", "6", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "11", "12"] }
      ]
    },
    {
      name: "Alface",
      variant: "Romana",
      type: "folha",
      slug: "alface-romana",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "6", "7", "8", "9"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5", "6", "7", "8"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3", "4", "8", "9", "10", "11"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "6", "7", "8", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "6", "7", "8", "9"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "5", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["5", "6", "7", "8", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["6", "7", "8", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "11", "12"] }
      ]
    },
    {
      name: "Espinafre",
      variant: "Gigante de Inverno",
      type: "folha",
      slug: "espinafre",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "9", "10", "11"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5", "8", "9"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["1", "4", "5", "6", "7", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "12"] }
      ]
    },
    {
      name: "Acelga",
      variant: "Penca Larga Branca",
      type: "folha",
      slug: "acelga",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "8", "9", "10"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5", "6", "8", "9"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "4", "9", "10", "11"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4", "8", "9"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3", "9", "10"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "10", "11"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["1", "4", "5", "6", "7", "8", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7", "8", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] }
      ]
    },
    {
      name: "Rúcula",
      variant: "Cultivada",
      type: "folha",
      slug: "rucula",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "8", "9", "10", "11"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5", "6", "8", "9"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "4", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["3", "4", "5", "6", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["4", "5", "6", "7", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "10", "11", "12"] }
      ]
    },
    {
      name: "Agrião",
      variant: "De Água",
      type: "folha",
      slug: "agriao",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4", "9", "10", "11"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5", "8", "9"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["1", "3", "4", "5", "6", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["4", "5", "6", "7", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "10", "11", "12"] }
      ]
    },
    {
      name: "Canónigos",
      variant: "Alface-de-cordeiro",
      type: "folha",
      slug: "canonigos",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["8", "9", "10", "11"] },
        { action: "direct_sowing", regions: ["2"], months: ["8", "9", "10"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["9", "10", "11", "12", "1"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["10", "11", "12", "1", "2", "3"] },
        { action: "harvest", regions: ["2"], months: ["10", "11", "12", "1", "2"] },
        { action: "harvest", regions: ["5", "6"], months: ["11", "12", "1", "2", "3", "4"] }
      ]
    },
    {
      name: "Chicória",
      variant: "Escarola",
      type: "folha",
      slug: "chicoria-escarola",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["6", "7", "8", "9"] },
        { action: "nursery", regions: ["2"], months: ["5", "6", "7", "8"] },
        { action: "nursery", regions: ["5", "6"], months: ["7", "8", "9", "10"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["7", "8", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["6", "7", "8", "9"] },
        { action: "plant", regions: ["5", "6"], months: ["8", "9", "10", "11"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["10", "11", "12", "1", "2"] },
        { action: "harvest", regions: ["2"], months: ["9", "10", "11", "12"] },
        { action: "harvest", regions: ["5", "6"], months: ["11", "12", "1", "2", "3"] }
      ]
    },
    {
      name: "Aipo",
      variant: "De Talo",
      type: "folha",
      slug: "aipo",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4", "5"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3", "4", "8", "9"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6", "7"] },
        { action: "plant", regions: ["2"], months: ["5", "6", "7"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5", "6", "9", "10"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["8", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["8", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "6", "7", "8", "9", "10", "11", "12"] }
      ]
    },

    // ==========================================
    // FRUTO (Fruiting vegetables)
    // ==========================================
    {
      name: "Tomate",
      variant: "Coração de Boi",
      type: "fruto",
      slug: "tomate-coracao-de-boi",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["6", "7", "8", "9", "10"] }
      ]
    },
    {
      name: "Tomate",
      variant: "Cereja (Cherry)",
      type: "fruto",
      slug: "tomate-cereja",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4", "5"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3", "4"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5", "6"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["6", "7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["5", "6", "7", "8", "9", "10", "11"] }
      ]
    },
    {
      name: "Tomate",
      variant: "Chucha (Roma)",
      type: "fruto",
      slug: "tomate-chucha",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["6", "7", "8", "9", "10"] }
      ]
    },
    {
      name: "Pimento",
      variant: "De Quatro Cantos",
      type: "fruto",
      slug: "pimento",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["6", "7", "8", "9", "10", "11"] }
      ]
    },
    {
      name: "Pimento",
      variant: "Padrón",
      type: "fruto",
      slug: "pimento-padron",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["6", "7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["5", "6", "7", "8", "9", "10"] }
      ]
    },
    {
      name: "Malagueta",
      variant: "Piri-piri",
      type: "fruto",
      slug: "malagueta",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["7", "8", "9", "10", "11"] },
        { action: "harvest", regions: ["2"], months: ["8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["6", "7", "8", "9", "10", "11"] }
      ]
    },
    {
      name: "Beringela",
      variant: "Comprida Roxa",
      type: "fruto",
      slug: "beringela",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["6", "7", "8", "9", "10", "11"] }
      ]
    },
    {
      name: "Curgete",
      variant: "Verde Escura",
      type: "fruto",
      slug: "curgete",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["4", "5", "6", "7"] },
        { action: "direct_sowing", regions: ["2"], months: ["5", "6"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["3", "4", "5", "6", "7", "8"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["2"], months: ["4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3", "4"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5", "6"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["6", "7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["5", "6", "7", "8", "9", "10", "11"] }
      ]
    },
    {
      name: "Pepino",
      variant: "Marketmore",
      type: "fruto",
      slug: "pepino",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "direct_sowing", regions: ["2"], months: ["5", "6"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["3", "4", "5", "6", "7"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["2"], months: ["4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3", "4"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["6", "7", "8", "9"] },
        { action: "harvest", regions: ["2"], months: ["7", "8", "9"] },
        { action: "harvest", regions: ["5", "6"], months: ["5", "6", "7", "8", "9", "10"] }
      ]
    },
    {
      name: "Abóbora",
      variant: "Menina",
      type: "fruto",
      slug: "abobora-menina",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "direct_sowing", regions: ["2"], months: ["5", "6"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["3", "4", "5", "6"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["3", "4"] },
        { action: "nursery", regions: ["2"], months: ["4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3", "4"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["8", "9", "10", "11"] },
        { action: "harvest", regions: ["2"], months: ["9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["7", "8", "9", "10", "11"] }
      ]
    },
    {
      name: "Abóbora",
      variant: "Manteiga (Butternut)",
      type: "fruto",
      slug: "abobora-manteiga",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "direct_sowing", regions: ["2"], months: ["5", "6"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["3", "4"] },
        { action: "nursery", regions: ["2"], months: ["4"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["8", "9", "10", "11"] },
        { action: "harvest", regions: ["2"], months: ["9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["7", "8", "9", "10"] }
      ]
    },
    {
      name: "Melancia",
      variant: "Crimson Sweet",
      type: "fruto",
      slug: "melancia",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["4", "5"] },
        { action: "direct_sowing", regions: ["2"], months: ["5"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["3", "4"] },
        { action: "nursery", regions: ["2"], months: ["4"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3", "4"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["7", "8", "9"] },
        { action: "harvest", regions: ["2"], months: ["8", "9"] },
        { action: "harvest", regions: ["5", "6"], months: ["6", "7", "8", "9"] }
      ]
    },
    {
      name: "Melão",
      variant: "Branco do Ribatejo",
      type: "fruto",
      slug: "melao-branco",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["4", "5"] },
        { action: "direct_sowing", regions: ["2"], months: ["5"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["3", "4"] },
        { action: "nursery", regions: ["2"], months: ["4"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["7", "8", "9"] },
        { action: "harvest", regions: ["2"], months: ["8", "9"] },
        { action: "harvest", regions: ["5", "6"], months: ["6", "7", "8", "9"] }
      ]
    },
    {
      name: "Morangueiro",
      variant: "Remontante",
      type: "fruto",
      slug: "morangueiro",
      schedules: [
        { action: "plant", regions: ["1", "3", "4"], months: ["2", "3", "4", "9", "10", "11"] },
        { action: "plant", regions: ["2"], months: ["3", "4", "5", "9", "10"] },
        { action: "plant", regions: ["5", "6"], months: ["1", "2", "3", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["4", "5", "6", "7", "8", "9"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7", "8", "9"] },
        { action: "harvest", regions: ["5", "6"], months: ["3", "4", "5", "6", "7", "8", "9", "10"] }
      ]
    },

    // ==========================================
    // RAIZ (Root vegetables)
    // ==========================================
    {
      name: "Cenoura",
      variant: "Nantesa",
      type: "raiz",
      slug: "cenoura",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "6", "9", "10"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5", "6"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "4", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["5", "6", "7", "8", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6"] }
      ]
    },
    {
      name: "Rabanete",
      variant: "Redondo Vermelho",
      type: "raiz",
      slug: "rabanete",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "6", "9", "10", "11"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5", "6", "7", "8", "9"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["3", "4", "5", "6", "7", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["4", "5", "6", "7", "8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "10", "11", "12"] }
      ]
    },
    {
      name: "Beterraba",
      variant: "De Mesa (Detroit)",
      type: "raiz",
      slug: "beterraba",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "8", "9", "10"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5", "6", "8", "9"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "4", "9", "10", "11"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4", "8", "9"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3", "9", "10"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "10", "11"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["5", "6", "7", "8", "10", "11", "12", "1"] },
        { action: "harvest", regions: ["2"], months: ["6", "7", "8", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "11", "12"] }
      ]
    },
    {
      name: "Nabo",
      variant: "Bola de Neve / Grelo",
      type: "raiz",
      slug: "nabo",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "8", "9", "10"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "7", "8", "9"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "9", "10", "11"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["1", "2", "4", "5", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "11", "12"] }
      ]
    },
    {
      name: "Pastinaca",
      variant: "Chirivia",
      type: "raiz",
      slug: "pastinaca",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "9", "10"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "9", "10", "11"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["1", "2", "6", "7", "8", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["7", "8", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "12"] }
      ]
    },

    // ==========================================
    // LEGUMINOSA (Legumes)
    // ==========================================
    {
      name: "Feijão Verde",
      variant: "Rasteiro",
      type: "leguminosa",
      slug: "feijao-verde-rasteiro",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["4", "5", "6", "7"] },
        { action: "direct_sowing", regions: ["2"], months: ["5", "6", "7"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["3", "4", "5", "6", "7"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["6", "7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["5", "6", "7", "8", "9", "10"] }
      ]
    },
    {
      name: "Feijão Verde",
      variant: "De Trepar",
      type: "leguminosa",
      slug: "feijao-verde-trepar",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["4", "5", "6", "7"] },
        { action: "direct_sowing", regions: ["2"], months: ["5", "6"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["3", "4", "5", "6", "7", "8"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["6", "7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["5", "6", "7", "8", "9", "10", "11"] }
      ]
    },
    {
      name: "Ervilha",
      variant: "De Quebrar (Torta)",
      type: "leguminosa",
      slug: "ervilha-torta",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["1", "2", "3", "10", "11", "12"] },
        { action: "direct_sowing", regions: ["2"], months: ["2", "3", "4", "10", "11"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["3", "4", "5", "6"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7"] },
        { action: "harvest", regions: ["5", "6"], months: ["2", "3", "4", "5"] }
      ]
    },
    {
      name: "Ervilha",
      variant: "De Desgranar",
      type: "leguminosa",
      slug: "ervilha-desgranar",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["1", "2", "3", "10", "11", "12"] },
        { action: "direct_sowing", regions: ["2"], months: ["2", "3", "4", "10", "11"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7"] },
        { action: "harvest", regions: ["5", "6"], months: ["3", "4", "5"] }
      ]
    },
    {
      name: "Fava",
      variant: "Do Algarve / Aguadulce",
      type: "leguminosa",
      slug: "fava",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["1", "2", "10", "11", "12"] },
        { action: "direct_sowing", regions: ["2"], months: ["2", "3", "10", "11"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["9", "10", "11", "12", "1"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["3", "4", "5", "6"] },
        { action: "harvest", regions: ["2"], months: ["5", "6"] },
        { action: "harvest", regions: ["5", "6"], months: ["2", "3", "4", "5"] }
      ]
    },
    {
      name: "Grão-de-bico",
      variant: "Tradicional",
      type: "leguminosa",
      slug: "grao-de-bico",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["7", "8"] },
        { action: "harvest", regions: ["2"], months: ["8", "9"] },
        { action: "harvest", regions: ["5", "6"], months: ["6", "7", "8"] }
      ]
    },

    // ==========================================
    // TUBÉRCULO (Tubers)
    // ==========================================
    {
      name: "Batata",
      variant: "Branca / Vermelha",
      type: "tuberculo",
      slug: "batata",
      schedules: [
        { action: "plant", regions: ["1", "3", "4"], months: ["2", "3", "4", "8", "9"] },
        { action: "plant", regions: ["2"], months: ["3", "4", "5"] },
        { action: "plant", regions: ["5", "6"], months: ["1", "2", "3", "8", "9", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["6", "7", "8", "9", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["4", "5", "6", "11", "12"] }
      ]
    },
    {
      name: "Batata-doce",
      variant: "Lira / Beauregard",
      type: "tuberculo",
      slug: "batata-doce",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5", "6"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["9", "10", "11"] },
        { action: "harvest", regions: ["2"], months: ["9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["8", "9", "10", "11"] }
      ]
    },
    {
      name: "Tupinambo",
      variant: "Alcachofra-de-Jerusalém",
      type: "tuberculo",
      slug: "tupinambo",
      schedules: [
        { action: "plant", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "plant", regions: ["2"], months: ["3", "4"] },
        { action: "plant", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["10", "11", "12", "1", "2"] },
        { action: "harvest", regions: ["2"], months: ["10", "11", "12", "1"] },
        { action: "harvest", regions: ["5", "6"], months: ["10", "11", "12", "1"] }
      ]
    },

    // ==========================================
    // BOLBO (Bulbs)
    // ==========================================
    {
      name: "Cebola",
      variant: "Garrafal / Valenciana",
      type: "bolbo",
      slug: "cebola",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["1", "10", "11", "12"] },
        { action: "nursery", regions: ["2"], months: ["1", "2", "11", "12"] },
        { action: "nursery", regions: ["5", "6"], months: ["9", "10", "11", "12"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "plant", regions: ["2"], months: ["3", "4", "5"] },
        { action: "plant", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["6", "7", "8"] },
        { action: "harvest", regions: ["2"], months: ["7", "8", "9"] },
        { action: "harvest", regions: ["5", "6"], months: ["5", "6", "7"] }
      ]
    },
    {
      name: "Alho",
      variant: "Branco / Roxo",
      type: "bolbo",
      slug: "alho",
      schedules: [
        { action: "plant", regions: ["1", "3", "4"], months: ["1", "10", "11", "12"] },
        { action: "plant", regions: ["2"], months: ["1", "2", "10", "11", "12"] },
        { action: "plant", regions: ["5", "6"], months: ["10", "11", "12", "1"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["5", "6", "7"] },
        { action: "harvest", regions: ["2"], months: ["6", "7", "8"] },
        { action: "harvest", regions: ["5", "6"], months: ["5", "6"] }
      ]
    },
    {
      name: "Alho-francês",
      variant: "Comprido de Inverno",
      type: "bolbo",
      slug: "alho-frances",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "8", "9"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3", "4", "8", "9", "10"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6", "7", "10", "11"] },
        { action: "plant", regions: ["2"], months: ["5", "6", "7"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5", "6", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["1", "2", "3", "8", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["1", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "7", "8", "9", "10", "11", "12"] }
      ]
    },
    {
      name: "Chalota",
      variant: "Tradicional",
      type: "bolbo",
      slug: "chalota",
      schedules: [
        { action: "plant", regions: ["1", "3", "4"], months: ["1", "2", "10", "11", "12"] },
        { action: "plant", regions: ["2"], months: ["2", "3", "10", "11"] },
        { action: "plant", regions: ["5", "6"], months: ["10", "11", "12", "1"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["5", "6", "7"] },
        { action: "harvest", regions: ["2"], months: ["6", "7", "8"] },
        { action: "harvest", regions: ["5", "6"], months: ["4", "5", "6"] }
      ]
    },

    // ==========================================
    // INFLORESCÊNCIA / COUVES (Brassicas & Inflorescences)
    // ==========================================
    {
      name: "Couve Portuguesa",
      variant: "Tronchuda / Penca",
      type: "inflorescencia",
      slug: "couve-portuguesa",
      schedules: [
        { action: "nursery", regions: ["1", "2", "3", "4"], months: ["5", "6", "7"] },
        { action: "nursery", regions: ["5", "6"], months: ["6", "7", "8"] },
        { action: "plant", regions: ["1", "2", "3", "4"], months: ["7", "8", "9"] },
        { action: "plant", regions: ["5", "6"], months: ["8", "9", "10"] },
        { action: "harvest", regions: ["1", "2", "3", "4"], months: ["1", "2", "11", "12"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "12"] }
      ]
    },
    {
      name: "Couve Galega",
      variant: "De Folha",
      type: "inflorescencia",
      slug: "couve-galega",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4", "7", "8", "9"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5", "7", "8"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3", "8", "9", "10"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "8", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "6", "8", "9"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "9", "10", "11"] },
        { action: "harvest", regions: ["1", "2", "3", "4", "5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] }
      ]
    },
    {
      name: "Couve Coração",
      variant: "De Boi",
      type: "inflorescencia",
      slug: "couve-coracao",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4", "7", "8", "9"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5", "7", "8"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3", "8", "9", "10"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "8", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "6", "8", "9"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "9", "10", "11"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["1", "2", "5", "6", "7", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["6", "7", "8", "10", "11", "12"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "11", "12"] }
      ]
    },
    {
      name: "Couve Lombarda",
      variant: "Frisada",
      type: "inflorescencia",
      slug: "couve-lombarda",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["5", "6", "7", "8"] },
        { action: "nursery", regions: ["2"], months: ["4", "5", "6", "7"] },
        { action: "nursery", regions: ["5", "6"], months: ["6", "7", "8", "9"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["6", "7", "8", "9"] },
        { action: "plant", regions: ["2"], months: ["6", "7", "8"] },
        { action: "plant", regions: ["5", "6"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["10", "11", "12", "1", "2"] },
        { action: "harvest", regions: ["2"], months: ["9", "10", "11", "12", "1"] },
        { action: "harvest", regions: ["5", "6"], months: ["11", "12", "1", "2", "3"] }
      ]
    },
    {
      name: "Brócolo",
      variant: "Calabrese",
      type: "inflorescencia",
      slug: "brocolo",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "6", "7", "8"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "6", "7"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "7", "8", "9"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "7", "8", "9"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "7", "8"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "8", "9", "10"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["1", "2", "5", "6", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["6", "7", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "11", "12"] }
      ]
    },
    {
      name: "Couve-flor",
      variant: "Bola de Neve",
      type: "inflorescencia",
      slug: "couve-flor",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["5", "6", "7", "8"] },
        { action: "nursery", regions: ["2"], months: ["4", "5", "6", "7"] },
        { action: "nursery", regions: ["5", "6"], months: ["6", "7", "8", "9"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["7", "8", "9"] },
        { action: "plant", regions: ["2"], months: ["6", "7", "8"] },
        { action: "plant", regions: ["5", "6"], months: ["8", "9", "10"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["10", "11", "12", "1", "2", "3"] },
        { action: "harvest", regions: ["2"], months: ["9", "10", "11", "12"] },
        { action: "harvest", regions: ["5", "6"], months: ["11", "12", "1", "2", "3"] }
      ]
    },
    {
      name: "Couve-de-bruxelas",
      variant: "Tradicional",
      type: "inflorescencia",
      slug: "couve-de-bruxelas",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "nursery", regions: ["2"], months: ["4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["5", "6", "7"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["6", "7", "8"] },
        { action: "plant", regions: ["2"], months: ["5", "6", "7"] },
        { action: "plant", regions: ["5", "6"], months: ["7", "8", "9"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["10", "11", "12", "1", "2"] },
        { action: "harvest", regions: ["2"], months: ["9", "10", "11", "12", "1"] },
        { action: "harvest", regions: ["5", "6"], months: ["11", "12", "1", "2", "3"] }
      ]
    },
    {
      name: "Couve Roxa",
      variant: "Cabeça de Preto",
      type: "inflorescencia",
      slug: "couve-roxa",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["3", "4", "5", "6", "7"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5", "6"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3", "6", "7", "8"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6", "7", "8"] },
        { action: "plant", regions: ["2"], months: ["5", "6", "7"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "7", "8", "9"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["8", "9", "10", "11", "12", "1"] },
        { action: "harvest", regions: ["2"], months: ["8", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["5", "6"], months: ["6", "7", "10", "11", "12", "1", "2"] }
      ]
    },
    {
      name: "Alcachofra",
      variant: "Verde de Laon",
      type: "inflorescencia",
      slug: "alcachofra",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "9", "10", "11"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7"] },
        { action: "harvest", regions: ["5", "6"], months: ["3", "4", "5", "6"] }
      ]
    },

    // ==========================================
    // AROMÁTICA (Aromatic & Medicinal herbs)
    // ==========================================
    {
      name: "Salsa",
      variant: "Lisa",
      type: "aromatica",
      slug: "salsa",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "6", "7", "8", "9", "10"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5", "6", "7", "8", "9"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["4", "5", "6", "7", "8", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7", "8", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] }
      ]
    },
    {
      name: "Coentros",
      variant: "Português",
      type: "aromatica",
      slug: "coentros",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["2", "3", "4", "5", "6", "9", "10", "11"] },
        { action: "direct_sowing", regions: ["2"], months: ["3", "4", "5", "6", "8", "9"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "9", "10", "11", "12"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["3", "4", "5", "6", "7", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7", "9", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "10", "11", "12"] }
      ]
    },
    {
      name: "Manjericão",
      variant: "Folha Grande / Genovês",
      type: "aromatica",
      slug: "manjericao",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "direct_sowing", regions: ["2"], months: ["5", "6"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["3", "4", "5", "6"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "plant", regions: ["2"], months: ["5", "6"] },
        { action: "plant", regions: ["5", "6"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["5", "6", "7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["6", "7", "8", "9"] },
        { action: "harvest", regions: ["5", "6"], months: ["4", "5", "6", "7", "8", "9", "10", "11"] }
      ]
    },
    {
      name: "Hortelã",
      variant: "Comum / Pimenta",
      type: "aromatica",
      slug: "hortela",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "9"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "9", "10", "11"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["3", "4", "5", "6", "7", "8", "9", "10", "11"] },
        { action: "harvest", regions: ["2"], months: ["4", "5", "6", "7", "8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] }
      ]
    },
    {
      name: "Alecrim",
      variant: "Rosmaninho-da-horta",
      type: "aromatica",
      slug: "alecrim",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["3", "4", "5", "9"] },
        { action: "nursery", regions: ["2"], months: ["4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3", "4", "9", "10"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "9"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "9", "10", "11"] },
        { action: "harvest", regions: ["1", "2", "3", "4", "5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] }
      ]
    },
    {
      name: "Tomilho",
      variant: "Vulgar",
      type: "aromatica",
      slug: "tomilho",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["2"], months: ["4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3", "4"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "9"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "9", "10", "11"] },
        { action: "harvest", regions: ["1", "2", "3", "4", "5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] }
      ]
    },
    {
      name: "Orégãos",
      variant: "Mediterrânico",
      type: "aromatica",
      slug: "oregaos",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "5"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "9"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "9", "10"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["4", "5", "6", "7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["5", "6", "7", "8", "9"] },
        { action: "harvest", regions: ["5", "6"], months: ["3", "4", "5", "6", "7", "8", "9", "10", "11"] }
      ]
    },
    {
      name: "Cebolinho",
      variant: "Folha Fina",
      type: "aromatica",
      slug: "cebolinho",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["3", "4", "5", "9"] },
        { action: "direct_sowing", regions: ["2"], months: ["4", "5"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["2", "3", "4", "9", "10"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "5", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "4", "9", "10"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["3", "4", "5", "6", "7", "8", "9", "10", "11"] },
        { action: "harvest", regions: ["2"], months: ["4", "5", "6", "7", "8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] }
      ]
    },

    // ==========================================
    // OUTRO (Other garden crops)
    // ==========================================
    {
      name: "Milho Doce",
      variant: "Golden Bantam",
      type: "outro",
      slug: "milho-doce",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["4", "5", "6"] },
        { action: "direct_sowing", regions: ["2"], months: ["5", "6"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["3", "4", "5", "6"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["7", "8", "9", "10"] },
        { action: "harvest", regions: ["2"], months: ["8", "9", "10"] },
        { action: "harvest", regions: ["5", "6"], months: ["6", "7", "8", "9", "10"] }
      ]
    },
    {
      name: "Funcho",
      variant: "De Bolbo (Florença)",
      type: "outro",
      slug: "funcho-de-bolbo",
      schedules: [
        { action: "direct_sowing", regions: ["1", "3", "4"], months: ["3", "4", "7", "8", "9"] },
        { action: "direct_sowing", regions: ["2"], months: ["4", "5", "7", "8"] },
        { action: "direct_sowing", regions: ["5", "6"], months: ["2", "3", "8", "9", "10"] },
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "7", "8"] },
        { action: "nursery", regions: ["2"], months: ["3", "4", "7"] },
        { action: "nursery", regions: ["5", "6"], months: ["1", "2", "8", "9"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["3", "4", "8", "9", "10"] },
        { action: "plant", regions: ["2"], months: ["4", "5", "8", "9"] },
        { action: "plant", regions: ["5", "6"], months: ["2", "3", "9", "10", "11"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["1", "5", "6", "10", "11", "12"] },
        { action: "harvest", regions: ["2"], months: ["6", "7", "10", "11"] },
        { action: "harvest", regions: ["5", "6"], months: ["1", "2", "4", "5", "11", "12"] }
      ]
    },
    {
      name: "Espargo",
      variant: "Verde (Mary Washington)",
      type: "outro",
      slug: "espargo",
      schedules: [
        { action: "nursery", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "nursery", regions: ["2"], months: ["3", "4"] },
        { action: "nursery", regions: ["5", "6"], months: ["2", "3"] },
        { action: "plant", regions: ["1", "3", "4"], months: ["2", "3", "4"] },
        { action: "plant", regions: ["2"], months: ["3", "4"] },
        { action: "plant", regions: ["5", "6"], months: ["1", "2", "3"] },
        { action: "harvest", regions: ["1", "3", "4"], months: ["3", "4", "5"] },
        { action: "harvest", regions: ["2"], months: ["4", "5", "6"] },
        { action: "harvest", regions: ["5", "6"], months: ["2", "3", "4", "5"] }
      ]
    }
  ];

  for (const item of culturesData) {
    const cultureRecord = new Record(culturesColl, {
      name: item.name,
      variant: item.variant || "",
      type: item.type,
      slug: item.slug
    });
    app.save(cultureRecord);

    for (const schedule of item.schedules) {
      const scheduleRecord = new Record(schedulesColl, {
        culture: cultureRecord.id,
        action: schedule.action,
        regions: schedule.regions,
        months: schedule.months
      });
      app.save(scheduleRecord);
    }
  }
}, (app) => {
  // down: all records will be dropped when collections are dropped
});
