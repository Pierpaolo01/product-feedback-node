

export default class protectedController {
    static test = async (req, res) => {
        res.send('You are viewing protected content')
    }
}
