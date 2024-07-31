const {DataTypes} = require('sequelize')
const sequelize = require('../config/dbConfig');

const favmovies = sequelize.define('favmovies', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    imdbID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
  }, {
    tableName: 'favmovies',
    timestamps: true,
  });
  
  module.exports = favmovies;