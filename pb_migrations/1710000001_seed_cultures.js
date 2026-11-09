/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const culturesColl = app.findCollectionByNameOrId("cultures");
  const schedulesColl = app.findCollectionByNameOrId("culture_schedules");

  const culturesData = [
    {
      name: "Alface",
      variant: "Quatro Estações",
      type: "folha",
      slug: "alface-quatro-estacoes",
      schedules: [
        {
          action: "sementeira_direta",
          regions: ["1", "3", "4"],
          months: ["3", "4", "5", "6", "7", "8", "9", "10"]
        },
        {
          action: "sementeira_direta",
          regions: ["2"],
          months: ["4", "5", "6", "7", "8", "9"]
        },
        {
          action: "sementeira_direta",
          regions: ["5", "6"],
          months: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
        },
        {
          action: "viveiro",
          regions: ["1", "3", "4"],
          months: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        },
        {
          action: "viveiro",
          regions: ["2"],
          months: ["2", "3", "4", "5", "6", "7"]
        },
        {
          action: "viveiro",
          regions: ["5", "6"],
          months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        },
        {
          action: "plantar",
          regions: ["1", "3", "4"],
          months: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
        },
        {
          action: "plantar",
          regions: ["2"],
          months: ["4", "5", "6", "7", "8", "9", "10"]
        },
        {
          action: "plantar",
          regions: ["5", "6"],
          months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        },
        {
          action: "colher",
          regions: ["1", "3", "4"],
          months: ["4", "5", "6", "7", "8", "9", "10", "11", "12"]
        },
        {
          action: "colher",
          regions: ["2"],
          months: ["5", "6", "7", "8", "9", "10", "11"]
        },
        {
          action: "colher",
          regions: ["5", "6"],
          months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        }
      ]
    },
    {
      name: "Tomate",
      variant: "Coração de Boi",
      type: "fruto",
      slug: "tomate-coracao-de-boi",
      schedules: [
        {
          action: "viveiro",
          regions: ["1", "3", "4"],
          months: ["2", "3", "4"]
        },
        {
          action: "viveiro",
          regions: ["2"],
          months: ["3", "4", "5"]
        },
        {
          action: "viveiro",
          regions: ["5", "6"],
          months: ["1", "2", "3"]
        },
        {
          action: "plantar",
          regions: ["1", "3", "4"],
          months: ["4", "5", "6"]
        },
        {
          action: "plantar",
          regions: ["2"],
          months: ["5", "6"]
        },
        {
          action: "plantar",
          regions: ["5", "6"],
          months: ["3", "4", "5"]
        },
        {
          action: "colher",
          regions: ["1", "3", "4"],
          months: ["7", "8", "9", "10"]
        },
        {
          action: "colher",
          regions: ["2"],
          months: ["8", "9", "10"]
        },
        {
          action: "colher",
          regions: ["5", "6"],
          months: ["6", "7", "8", "9", "10"]
        }
      ]
    },
    {
      name: "Cenoura",
      variant: "",
      type: "raiz",
      slug: "cenoura",
      schedules: [
        {
          action: "sementeira_direta",
          regions: ["1", "3", "4"],
          months: ["2", "3", "4", "5", "6", "9", "10"]
        },
        {
          action: "sementeira_direta",
          regions: ["2"],
          months: ["3", "4", "5", "6"]
        },
        {
          action: "sementeira_direta",
          regions: ["5", "6"],
          months: ["1", "2", "3", "4", "9", "10", "11", "12"]
        },
        {
          action: "colher",
          regions: ["1", "3", "4"],
          months: ["5", "6", "7", "8", "9", "10", "11", "12"]
        },
        {
          action: "colher",
          regions: ["2"],
          months: ["7", "8", "9", "10"]
        },
        {
          action: "colher",
          regions: ["5", "6"],
          months: ["1", "2", "3", "4", "5", "6"]
        }
      ]
    },
    {
      name: "Batata",
      variant: "",
      type: "tuberculo",
      slug: "batata",
      schedules: [
        {
          action: "plantar",
          regions: ["1", "3", "4"],
          months: ["2", "3", "4"]
        },
        {
          action: "plantar",
          regions: ["2"],
          months: ["3", "4", "5"]
        },
        {
          action: "plantar",
          regions: ["5", "6"],
          months: ["1", "2", "12"]
        },
        {
          action: "colher",
          regions: ["1", "3", "4"],
          months: ["6", "7", "8", "9"]
        },
        {
          action: "colher",
          regions: ["2"],
          months: ["7", "8", "9", "10"]
        },
        {
          action: "colher",
          regions: ["5", "6"],
          months: ["4", "5", "6"]
        }
      ]
    },
    {
      name: "Couve Portuguesa",
      variant: "Tronchuda",
      type: "inflorescencia",
      slug: "couve-portuguesa",
      schedules: [
        {
          action: "viveiro",
          regions: ["1", "2", "3", "4"],
          months: ["5", "6", "7"]
        },
        {
          action: "viveiro",
          regions: ["5", "6"],
          months: ["6", "7", "8"]
        },
        {
          action: "plantar",
          regions: ["1", "2", "3", "4"],
          months: ["7", "8", "9"]
        },
        {
          action: "plantar",
          regions: ["5", "6"],
          months: ["8", "9", "10"]
        },
        {
          action: "colher",
          regions: ["1", "2", "3", "4"],
          months: ["1", "2", "11", "12"]
        },
        {
          action: "colher",
          regions: ["5", "6"],
          months: ["1", "2", "12"]
        }
      ]
    },
    {
      name: "Cebola",
      variant: "",
      type: "bolbo",
      slug: "cebola",
      schedules: [
        {
          action: "viveiro",
          regions: ["1", "3", "4"],
          months: ["1", "10", "11", "12"]
        },
        {
          action: "viveiro",
          regions: ["2"],
          months: ["1", "2", "11", "12"]
        },
        {
          action: "viveiro",
          regions: ["5", "6"],
          months: ["9", "10", "11", "12"]
        },
        {
          action: "plantar",
          regions: ["1", "3", "4"],
          months: ["2", "3", "4"]
        },
        {
          action: "plantar",
          regions: ["2"],
          months: ["3", "4", "5"]
        },
        {
          action: "plantar",
          regions: ["5", "6"],
          months: ["1", "2", "3"]
        },
        {
          action: "colher",
          regions: ["1", "3", "4"],
          months: ["6", "7", "8"]
        },
        {
          action: "colher",
          regions: ["2"],
          months: ["7", "8", "9"]
        },
        {
          action: "colher",
          regions: ["5", "6"],
          months: ["5", "6", "7"]
        }
      ]
    },
    {
      name: "Feijão Verde",
      variant: "Rasteiro",
      type: "leguminosa",
      slug: "feijao-verde-rasteiro",
      schedules: [
        {
          action: "sementeira_direta",
          regions: ["1", "3", "4"],
          months: ["4", "5", "6", "7"]
        },
        {
          action: "sementeira_direta",
          regions: ["2"],
          months: ["5", "6", "7"]
        },
        {
          action: "sementeira_direta",
          regions: ["5", "6"],
          months: ["3", "4", "5", "6", "7"]
        },
        {
          action: "colher",
          regions: ["1", "3", "4"],
          months: ["6", "7", "8", "9", "10"]
        },
        {
          action: "colher",
          regions: ["2"],
          months: ["7", "8", "9", "10"]
        },
        {
          action: "colher",
          regions: ["5", "6"],
          months: ["5", "6", "7", "8", "9", "10"]
        }
      ]
    },
    {
      name: "Pimento",
      variant: "",
      type: "fruto",
      slug: "pimento",
      schedules: [
        {
          action: "viveiro",
          regions: ["1", "3", "4"],
          months: ["2", "3", "4"]
        },
        {
          action: "viveiro",
          regions: ["2"],
          months: ["3", "4"]
        },
        {
          action: "viveiro",
          regions: ["5", "6"],
          months: ["1", "2", "3"]
        },
        {
          action: "plantar",
          regions: ["1", "3", "4"],
          months: ["4", "5", "6"]
        },
        {
          action: "plantar",
          regions: ["2"],
          months: ["5", "6"]
        },
        {
          action: "plantar",
          regions: ["5", "6"],
          months: ["3", "4", "5"]
        },
        {
          action: "colher",
          regions: ["1", "3", "4"],
          months: ["7", "8", "9", "10"]
        },
        {
          action: "colher",
          regions: ["2"],
          months: ["8", "9", "10"]
        },
        {
          action: "colher",
          regions: ["5", "6"],
          months: ["6", "7", "8", "9", "10", "11"]
        }
      ]
    },
    {
      name: "Espinafre",
      variant: "",
      type: "folha",
      slug: "espinafre",
      schedules: [
        {
          action: "sementeira_direta",
          regions: ["1", "3", "4"],
          months: ["2", "3", "4", "5", "9", "10", "11"]
        },
        {
          action: "sementeira_direta",
          regions: ["2"],
          months: ["3", "4", "5", "8", "9"]
        },
        {
          action: "sementeira_direta",
          regions: ["5", "6"],
          months: ["1", "2", "3", "10", "11", "12"]
        },
        {
          action: "colher",
          regions: ["1", "3", "4"],
          months: ["1", "4", "5", "6", "7", "10", "11", "12"]
        },
        {
          action: "colher",
          regions: ["2"],
          months: ["5", "6", "7", "10", "11"]
        },
        {
          action: "colher",
          regions: ["5", "6"],
          months: ["1", "2", "3", "4", "5", "12"]
        }
      ]
    },
    {
      name: "Salsa",
      variant: "",
      type: "aromatica",
      slug: "salsa",
      schedules: [
        {
          action: "sementeira_direta",
          regions: ["1", "3", "4"],
          months: ["2", "3", "4", "5", "6", "7", "8", "9", "10"]
        },
        {
          action: "sementeira_direta",
          regions: ["2"],
          months: ["3", "4", "5", "6", "7", "8", "9"]
        },
        {
          action: "sementeira_direta",
          regions: ["5", "6"],
          months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        },
        {
          action: "colher",
          regions: ["1", "3", "4"],
          months: ["4", "5", "6", "7", "8", "9", "10", "11", "12"]
        },
        {
          action: "colher",
          regions: ["2"],
          months: ["5", "6", "7", "8", "9", "10", "11"]
        },
        {
          action: "colher",
          regions: ["5", "6"],
          months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        }
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
