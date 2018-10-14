

module.exports.controller = function(app) {
    
    app.get('/', function(req, res) {
        let locals = res.locals;
        locals.title = 'express-starter';
        res.render('index');
    });
}
