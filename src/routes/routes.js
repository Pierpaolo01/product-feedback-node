import suggestionRoutes from "./suggestionRoutes.js";
import commentRoutes from "./commentRoutes.js";

 const routes = (app) => {
    app.use('/api', suggestionRoutes)
    app.use('/api', commentRoutes)
}

export default routes
