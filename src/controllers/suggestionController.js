import suggestionsModel from "../models/suggestionsModel.js";


export default class suggestionController {
    static getAllSuggestions = async (req, res) => {
    //    TODO
    }

    static createSuggestion = async (req, res) => {
        const newSuggestion = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            likes: 0,
            comments: {testUser: 'shesh nice post'},
            userId: req.body.userId
        }

        try {

            const createdSuggestion = await suggestionsModel.create(newSuggestion)
            res.status(201).send(createdSuggestion)

        } catch (err) {
            res.status(500).send('error when creating new suggestion')
        }
    }
}
