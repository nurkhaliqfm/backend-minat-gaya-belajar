module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      referal_code: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Users.associate = (models) => {
    Users.hasOne(models.biodata_users, {
      foreignKey: {
        name: "id_user",
      },
      as: "biodata_users",
    });

    Users.hasMany(models.oauth_authorization_codes, {
      foreignKey: {
        name: "id_user",
      },
      as: "oauth_authorization_codes",
    });

    Users.hasMany(models.events_history, {
      foreignKey: {
        name: "id_user",
      },
      as: "events_history",
    });
  };

  return Users;
};
