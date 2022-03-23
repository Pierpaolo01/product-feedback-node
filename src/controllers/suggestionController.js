import suggestionsModel from "../models/suggestionsModel.js";


export default class suggestionController {
    static getAllSuggestions = async (req, res) => {
        try{
            const suggestions = await suggestionsModel.findAll()
            res.status(200).send(suggestions)
        } catch (err) {
            res.send(500).send('Something went wrong with fetching')
        }
    }

    static getSingleSuggestion = async (req, res) => {
        const suggestionId = req.params.id

        try {
            const suggestion = await suggestionsModel.findByPk(suggestionId)
            console.log(suggestionId)
            res.status(200).send(suggestion)
        } catch (err) {
            res.status(500).send('Failed')
        }
    }

    static createSuggestion = async (req, res) => {
        const newSuggestion = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            likes: 0,
            comments: {testUser: 'shesh nice post'},
            userId: req.user.id
        }

        try {

            const createdSuggestion = await suggestionsModel.create(newSuggestion)
            res.status(201).send(createdSuggestion)

        } catch (err) {
            res.status(500).send('error when creating new suggestion')
        }
    }

    static patchSuggestion = async (req, res) => {
        const suggestionId = req.params.id
        const userId = req.body.userId

        try {
            const suggestion = await suggestionsModel.findByPk(suggestionId)

            if (userId !== suggestion.userId) res.status(403)

            suggestion.title = req.body.title
            suggestion.category = req.body.category
            suggestion.description = req.body.description

            await suggestion.save()
            res.status(204).send(suggestion)

        } finally {

        }
    }

    static deleteSuggestion = async (req, res) => {
        const suggestionId = req.params.id

        try {
            const suggestion = await suggestionsModel.findByPk(suggestionId)

            await suggestion.destroy()

            res.status(204).send('DELETED')
        } finally {
        }
    }
}
