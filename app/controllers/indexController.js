

module.exports.controller = function(app) {
    
    app.get('/',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
        let locals = res.locals;
        locals.title = 'express-starter';
        res.render('index', { user: req.user });
    });
}
