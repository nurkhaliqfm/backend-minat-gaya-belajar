module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define(
    "events",
    {
      name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      id_school: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      id_kode_soal: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Events.associate = (models) => {
    Events.hasMany(models.events_history, {
      foreignKey: {
        name: "id_event",
      },
      as: "events_history",
    });
    Events.hasMany(models.bundle_soal, {
      foreignKey: {
        name: "id_event",
      },
      as: "bundle_soal",
    });
    Events.belongsTo(models.ref_school, {
      foreignKey: {
        name: "id_school",
      },
      as: "ref_school",
    });
  };

  return Events;
};
