const jwt = require("jsonwebtoken");

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found', req.originalUrl);
    next(error);
}

function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}

function verifyUser(req, res, next) {
    
    // bypass some of urls 
    if(
       (
            req.baseUrl.includes('/api/category') || 
            req.baseUrl.includes('/api/course')
        ) && 
        req.method == 'GET'
    ) {
        next();
        return;
    }

    const token = req.headers.authorization; 
    const decodedToken = jwt.verify(token,"1qw11qee33333" );
    if(decodedToken.userId) {
        let tmpBody = req.body;
        tmpBody.userId = parseInt(decodedToken.userId);
        next();
    } else {
        res.status(res.statusCode || 500);
        res.json({
            message: 'Invalid auth',
        });
    }
}

function createAuthToken(user) {
    return jwt.sign( { userId: user.id, email: user.email }, "1qw11qee33333", { expiresIn: "1h" } );
}

module.exports = {
    notFound,
    errorHandler,
    verifyUser,
    createAuthToken
}