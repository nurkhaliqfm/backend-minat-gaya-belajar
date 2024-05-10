module.exports = (sequelize, DataTypes) => {
  const RefSchool = sequelize.define(
    "ref_school",
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

  return RefSchool;
};
