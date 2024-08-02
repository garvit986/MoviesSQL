const {DataTypes} = require('sequelize')
const sequelize = require('../config/dbConfig');

const comments = sequelize.define('comments', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    imdbID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
  }, {
    tableName: 'comments',
    timestamps: true,
  });
  
  module.exports = comments;