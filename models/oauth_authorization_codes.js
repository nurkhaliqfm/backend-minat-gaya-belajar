module.exports = (sequelize, DataTypes) => {
  const OauthAuthorizationCode = sequelize.define(
    "oauth_authorization_codes",
    {
      authorization_codes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  OauthAuthorizationCode.associate = (models) => {
    OauthAuthorizationCode.hasMany(models.oauth_refresh_tokens, {
      foreignKey: {
        name: "id_auth",
      },
      as: "oauth_refresh_tokens",
    });

    OauthAuthorizationCode.hasMany(models.oauth_access_tokens, {
      foreignKey: {
        name: "id_auth",
      },
      as: "oauth_access_tokens",
    });
  };

  return OauthAuthorizationCode;
};
