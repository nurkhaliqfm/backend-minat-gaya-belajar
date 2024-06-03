module.exports = (sequelize, DataTypes) => {
  const EventsHistory = sequelize.define(
    "events_history",
    {
      id_event: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_result: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  EventsHistory.associate = (models) => {
    EventsHistory.belongsTo(models.ref_result, {
      foreignKey: {
        name: "id_result",
      },
      as: "ref_result",
    });
    EventsHistory.belongsTo(models.users, {
      foreignKey: {
        name: "id_user",
      },
      as: "users",
    });
  };

  return EventsHistory;
};
