import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";


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
        console.log(suggestionId)
        try {
            const suggestionComments = await commentModel.findAll({
                where: {
                    suggestionId,
                },
                include: userModel,
            })

            console.log({suggestionComments})

            res.status(200).send({comments: suggestionComments,})
        } catch (e) {
            console.log({ shitError: e })
            res.status(500).send(e)

        }
    }

    static deleteComment = async (req, res) => {
        const userId = req.user.id

        try {
            const deleteComment = await commentModel.destroy()

            if (deleteComment.userId !== userId) {
                res.status(403).send("Unauthorized")
            }

            deleteComment.destroy()

            res.status(203).send(deleteComment)
        } catch (e) {
            res.status(500).send({error: "something went wrong when deleting comment"})
        }
    }
}
