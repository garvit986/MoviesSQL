const {DataTypes} = require('sequelize')
const sequelize = require('../config/dbConfig');

const comments = sequelize.define('comments', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    imdbID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
  }, {
    tableName: 'comments',
    timestamps: true,
  });
  
  module.exports = comments;