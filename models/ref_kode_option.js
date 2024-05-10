module.exports = (sequelize, DataTypes) => {
  const RefKodeOption = sequelize.define(
    "ref_kode_option",
    {
      id_kode_soal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  RefKodeOption.associate = (models) => {
    RefKodeOption.belongsTo(models.ref_kode_soal, {
      foreignKey: {
        name: "id_kode_soal",
      },
      as: "ref_kode_soal",
    });
  };

  return RefKodeOption;
};
