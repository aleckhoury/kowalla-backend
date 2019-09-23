const expressJwt = require('express-jwt');

module.exports = jwt;

function jwt() {
    return expressJwt({ secret: process.env.secret }).unless({
        path: [
            // public routes that don't require authentication
            '/api/v1/users/login',
            '/api/v1/users/',
            /^\/api\/v1\/users\/.*/,
            /^\/api\/v1\/search\/.*/,
            /^\/api\/v1\/profiles\/.*/,
            /^\/api\/v1\/spaces\/.*/,
            /^\/api\/v1\/reactions\/.*/,
            /^\/api\/v1\/comments\/.*/
        ]
    });
}