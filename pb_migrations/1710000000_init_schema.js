/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const cultures = new Collection({
    name: "cultures",
    type: "base",
    listRule: "",
    viewRule: "",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
      },
      {
        name: "variant",
        type: "text",
      },
      {
        name: "type",
        type: "select",
        required: true,
        values: [
          "folha",
          "fruto",
          "raiz",
          "leguminosa",
          "tuberculo",
          "bolbo",
          "inflorescencia",
          "aromatica",
          "outro"
        ],
      },
      {
        name: "slug",
        type: "text",
        required: true,
      },
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_cultures_slug ON cultures (slug)"
    ]
  });

  app.save(cultures);

  const schedules = new Collection({
    name: "culture_schedules",
    type: "base",
    listRule: "",
    viewRule: "",
    fields: [
      {
        name: "culture",
        type: "relation",
        required: true,
        collectionId: cultures.id,
        cascadeDelete: true,
        maxSelect: 1,
      },
      {
        name: "action",
        type: "select",
        required: true,
        values: [
          "sementeira_direta",
          "viveiro",
          "plantar",
          "colher"
        ],
      },
      {
        name: "regions",
        type: "select",
        required: true,
        maxSelect: 6,
        values: ["1", "2", "3", "4", "5", "6"],
      },
      {
        name: "months",
        type: "select",
        required: true,
        maxSelect: 12,
        values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      },
    ],
    indexes: [
      "CREATE INDEX idx_schedules_culture ON culture_schedules (culture)"
    ]
  });

  app.save(schedules);
}, (app) => {
  const schedules = app.findCollectionByNameOrId("culture_schedules");
  if (schedules) {
    app.delete(schedules);
  }

  const cultures = app.findCollectionByNameOrId("cultures");
  if (cultures) {
    app.delete(cultures);
  }
});
