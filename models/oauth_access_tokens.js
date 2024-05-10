module.exports = (sequelize, DataTypes) => {
  const OauthAccessToken = sequelize.define(
    "oauth_access_tokens",
    {
      access_token: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      access_token_expires_at: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_auth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return OauthAccessToken;
};
