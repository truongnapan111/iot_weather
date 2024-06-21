const dashboardRouter = require('./site')

function route(app){
    app.use('/', dashboardRouter);
}

module.exports = route 