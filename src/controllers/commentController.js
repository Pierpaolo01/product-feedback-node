import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
import replyModel from "../models/replyModel.js";


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

            res.status(200).send({data: suggestionComments,})
        } catch (e) {
            console.log({ shitError: e })
            res.status(500).send(e)

        }
    }

    static deleteComment = async (req, res) => {
        const userId = req.user.id
        const commentId = req.params.commentId

        try {
            const deleteComment = await commentModel.findByPk(commentId)

            if (deleteComment.userId === userId || req.user.permissions.includes("DELETE_ANY_COMMENT")) {
                await deleteComment.destroy()

                res.status(203).send(deleteComment)
            } else {
                res.status(403).send("Unauthorized")
            }

        } catch (e) {
            res.status(500).send({error: "something went wrong when deleting comment"})
        }
    }

    static getAllCommentReplies = async (req, res) => {
        const commentId = req.params.id

        try {

            const commentReplies = await replyModel.findAll({
                where: {
                    commentId,
                },
                include: userModel
            })

            res.status(200).send({data: commentReplies})

        } catch (e) {
            res.status(500).send(e)
        }
    }

    static createCommentReply = async (req, res) => {
        const commentId = req.params.id
        const userId = req.user.id
        const reply = req.body.reply
        try {
            const createdComment = await replyModel.create({
                reply,
                commentId,
                userId,
            })

            res.status(201).send({data: createdComment})
        } catch (e) {
            res.status(500).send(e)
            console.log(e)
        }
    }

    static deleteReply = async (req, res) => {
        const userId = req.user.id;
        const replyId = req.params.replyId

        try {
            const reply = await replyModel.findByPk(replyId)

            if (reply.userId === userId || req.user.permissions.includes("DELETE_ANY_COMMENT")) {
                await reply.destroy()

                res.status(203).send(reply)
            } else {
                res.status(403).send("Unauthorized")
            }
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
