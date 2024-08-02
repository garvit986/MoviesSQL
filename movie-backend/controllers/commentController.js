const comments = require("../models/commentSchema")
const messages = require("../validations/messageDefault")
const statusCodes = require("../validations/statusCodes")

const addComment = async(req,res) =>{
    try {
        const { imdbID, username, comment, rating } = req.body
        await comments.create({username: username, imdbID: imdbID, comment: comment, rating: rating})
        res.status(statusCodes.OK).json(messages.COMMENT_ADDED)
    }   
     catch (error) {
        console.log(error)       
    }
}

const getComment = async(req,res) =>{
    try {
        const {imdbID} = req.body
        const movie = await comments.findAll({where: {imdbID:imdbID}})
        const fetchComments = movie.map(imdbID=>imdbID.comment)
        res.status(statusCodes.OK).json({comments: fetchComments})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {addComment, getComment}