// // Dependencies
//
// // Models
// const User = require('../models/UserModel');
//
// module.exports = class UserController {
//     createUser(req, res, next) {
//         let newUser = new User({
//             email: 'test email',
//             username: 'test username',
//         });
//         const addUser = (newUser, callback) => {
//             newUser.save(callback);
//         };
//
//         addUser(newUser, (err, newUser) => {
//             if(err) {
//                 console.log(err);
//                 res.json({success: false, msg: "Failed to signup user"});
//             } else {
//                 res.json({success: true, msg: "User registered"});
//             }
//         });
//     }
//    
//     static async register ({ request, auth, response }) {
//         const userData = request.only(['username', 'email', 'password']);
//
//         try {
//             const user = await User.create(userData)
//
//             const token = await auth.generate(user)
//
//             return response.json({
//                 status: 'success',
//                 data: token
//             })
//         } catch (error) {
//             return response.status(400).json({
//                 status: 'error',
//                 message: 'There was a problem creating the user, please try again later.'
//             })
//         }
//     }
//
//     static async login ({ request, auth, response }) {
//         const { email, password } = request.only(['email', 'password'])
//
//         try {
//             const token = await auth.attempt(email, password)
//
//             return response.json({
//                 status: 'success',
//                 data: token
//             })
//         } catch (error) {
//             response.status(400).json({
//                 status: 'error',
//                 message: 'Invalid email/password.'
//             })
//         }
//     }
//
//     static async me ({ auth, response }) {
//         return response.json({
//             status: 'success',
//             data: auth.user
//         })
//     }
// }

// Dependencies
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

// Models

module.exports = {
    // createUser(req, res, next) {
    //     let newUser = new User({
    //         email: req.body.email,
    //         username: req.body.username,
    //     });
    //     const addUser = (newUser, callback) => {
    //         newUser.save(callback);
    //     };
    //
    //     addUser(newUser, (err, newUser) => {
    //         if(err) {
    //             console.log(err);
    //             res.json({success: false, msg: "Failed to signup user"});
    //         } else {
    //             res.json({success: true, msg: "User registered"});
    //         }
    //     });
    // },
    createUser(req, res, next) {
        let password;
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            console.log(hash);
            password = hash;
        });

        try {
            console.log(password);
            let newUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: password,
            });
            newUser.save();
            return res.json({
                status: 'success',
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: 'There was a problem creating the user, please try again later.'
            })
        }
    }
};
