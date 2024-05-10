module.exports = (sequelize, DataTypes) => {
  const BundleSoal = sequelize.define(
    "bundle_soal",
    {
      id_event: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      id_soal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  BundleSoal.associate = (models) => {
    BundleSoal.belongsTo(models.bank_soal, {
      foreignKey: {
        name: "id_soal",
      },
      as: "bank_soal",
    });
  };

  return BundleSoal;
};
