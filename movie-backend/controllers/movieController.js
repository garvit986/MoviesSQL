const favmovies = require("../models/favmoviesSchema")
const User = require("../models/userSchema")
const messages = require("../validations/messageDefault")
const statusCodes = require("../validations/statusCodes")

const addFavorite = async(req,res) =>{
    const{ username, imdbID } = req.body
    try {
        const exists = await favmovies.findOne({where: {username:username,imdbID:imdbID}})

        if(exists){
            return res.status(statusCodes.BAD_REQUEST).json({message: messages.MOVIE_EXISTS})
        }
        favmovies.create({username:username,imdbID:imdbID})
        return res.status(statusCodes.OK).json({ message: messages.MOVIE_ADDED})
    } catch (error) {
        console.log(error)
    }
}

const removeFavorite = async(req,res)=>{
    const {username, imdbID} = req.body
    try {
        const user = favmovies.findOne({where: {username}})

        if(!user){
            return res.status(statusCodes.NOT_FOUND).json({message: messages.USER_NOT_FOUND})
        }

    await favmovies.destroy({where: {username: username, imdbID: imdbID}})
    
    return res.status(statusCodes.OK).json({message: messages.MOVIE_REMOVED})
    } catch (error) {
        console.log(error)
    }
}

const getfavorite = async(req,res)=>{
    const {username} = req.body
    try {
        const user = await favmovies.findAll({where: {username}})

        if(!user){
            return res.status(statusCodes.NOT_FOUND).json({message: messages.USER_NOT_FOUND})
        }
    
    const imdbIDs = user.map(fav=>fav.imdbID)
    return res.status(statusCodes.OK).json({favmovies: imdbIDs})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addFavorite,
    removeFavorite,
    getfavorite
}