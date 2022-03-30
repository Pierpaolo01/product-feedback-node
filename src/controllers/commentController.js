import commentModel from "../models/commentModel.js";


export default class CommentController {
    static createComment = async (req, res) => {
        const comment = req.body
        const suggestionId = req.params.id
        const userId = req.user.id

        try{
            // const newComment = commentModel.create({
            //     comment,
            //     userId,
            //     suggestionId,
            // })
            // res.status(201).send({newComment})
        }catch (err) {

        }
    }
}
