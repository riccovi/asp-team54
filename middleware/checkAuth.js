module.exports = function(req, res, next) {
    if (!req.session.user) {
        // If the request accepts JSON, respond with JSON.
        if (req.accepts('json')) {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            // Else, redirect to the login page.
            res.redirect('/login');
        }
    } else {
        next();
    }
};
