const fs = require ("fs");

function logMiddleware (req, res, next){
    fs.appendFileSync('log.txt', 'Se ingresó en la pagina ' + req.url)
    
    next();
}

module.exports = logMiddleware;