import commentModel from "../models/commentModel.js";


export default class CommentController {
    static createComment = async (req, res) => {
        const comment = req.body.comment
        const suggestionId = req.params.id
        const userId = req.user.id

        try{
            const newComment = await commentModel.create({
                comment,
                userId,
                suggestionId,
            })
            console.log({newComment})
            res.status(201).send({newComment})
        }catch (err) {
            console.log({err})
        }
    }

    static getAllComments = async (req, res) => {
        const suggestionId = req.params.id

        try {
            const suggestionComments = await commentModel.findAll({
                where: {
                    suggestionId,
                }
            })

            res.status(200).send({comments: suggestionComments,})
        } catch (e) {

        }
    }
}
