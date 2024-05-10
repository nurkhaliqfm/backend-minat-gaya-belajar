module.exports = (sequelize, DataTypes) => {
  const RefKodeOption = sequelize.define(
    "ref_kode_option",
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

  return RefKodeOption;
};
