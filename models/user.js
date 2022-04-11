const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model{
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      profile: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      profileImage: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      snsId: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: "local",
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: "User",
      tableName: "users",
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow", 
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  } 
}