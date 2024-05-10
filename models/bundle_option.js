module.exports = (sequelize, DataTypes) => {
  const BundleOption = sequelize.define(
    "bundle_option",
    {
      id_soal: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      id_kode_option: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      name: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  BundleOption.associate = (models) => {
    BundleOption.belongsTo(models.ref_kode_option, {
      foreignKey: {
        name: "id_kode_option",
      },
      as: "ref_kode_option",
    });
  };

  return BundleOption;
};
