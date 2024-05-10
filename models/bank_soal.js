module.exports = (sequelize, DataTypes) => {
  const BankSoal = sequelize.define(
    "bank_soal",
    {
      id_kode_soal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      soal: {
        type: DataTypes.TEXT("LONG"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  BankSoal.associate = (models) => {
    BankSoal.hasMany(models.bundle_option, {
      foreignKey: {
        name: "id_soal",
      },
      as: "bundle_option",
    });

    BankSoal.belongsTo(models.ref_kode_soal, {
      foreignKey: {
        name: "id_kode_soal",
      },
      as: "ref_kode_soal",
    });
  };

  return BankSoal;
};
