module.exports = (sequelize, DataTypes) => {
  const BiodataUser = sequelize.define(
    "biodata_users",
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tgl_lahir: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      foto: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      hp: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      isKuliah: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      id_school: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      id_user: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      freezeTableName: true,
    }
  );

  BiodataUser.associate = (models) => {
    BiodataUser.belongsTo(models.ref_school, {
      foreignKey: {
        name: "id_school",
      },
      as: "ref_school",
    });
  };

  return BiodataUser;
};
