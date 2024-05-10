module.exports = (sequelize, DataTypes) => {
  const OauthRefreshToken = sequelize.define(
    "oauth_refresh_tokens",
    {
      refresh_token: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      refresh_token_expires_at: {
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

  return OauthRefreshToken;
};
