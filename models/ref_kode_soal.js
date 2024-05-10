module.exports = (sequelize, DataTypes) => {
  const RefKodeSoal = sequelize.define(
    "ref_kode_soal",
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return RefKodeSoal;
};
