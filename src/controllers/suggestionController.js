import suggestionModel from "../models/suggestionModel.js";


export default class suggestionController {
    static getAllSuggestions = async (req, res) => {
        console.log(req.query.category)
        const queryParam = req.query.category ? req.query.category : ''
        let suggestions;
        try{

            if (queryParam) suggestions = await suggestionModel.findAll({where: {category: queryParam}})
            if(!queryParam) suggestions = await suggestionModel.findAll()

            if (!suggestions) res.status(204)
            res.status(200).send(suggestions)

        } catch (err) {
            res.send(500).send('Something went wrong with fetching')
        }
    }

    static getSingleSuggestion = async (req, res) => {
        const suggestionId = req.params.id

        try {
            const suggestion = await suggestionModel.findByPk(suggestionId)
            console.log(suggestionId)
            res.status(200).send({data: suggestion})
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
            userId: req.user.id
        }

        try {

            const createdSuggestion = await suggestionModel.create(newSuggestion)
            res.status(201).send(createdSuggestion)

        } catch (err) {
            res.status(500).send('error when creating new suggestion')
        }
    }

    static patchSuggestion = async (req, res) => {
        const suggestionId = req.params.id
        const userId = req.user.userId

        try {
            const suggestion = await suggestionModel.findByPk(suggestionId)

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
            const suggestion = await suggestionModel.findByPk(suggestionId)

            await suggestion.destroy()

            res.status(204).send('DELETED')
        } finally {
        }
    }
}
