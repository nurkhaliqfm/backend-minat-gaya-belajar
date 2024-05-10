module.exports = (sequelize, DataTypes) => {
  const RefResult = sequelize.define(
    "ref_result",
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      keterangan: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      rekomendasi: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return RefResult;
};
