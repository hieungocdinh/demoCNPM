const User = require('../models/User');

class LoginController {
    // GET /login
    index(req, res) {
        res.render('login/login');
    }

    // POST /login/check
    check(req, res, next) {
        User.findOne({ username: req.body.username })
            .then(user => {
                if (!user) {
                    res.json({ message: 'User not found' });
                } else {
                    if (user.password !== req.body.password) {
                        res.json({ message: 'Invalid password' });
                    } else {
                        res.json({ message: 'Login successful' , type: user.type});
                    }
                }
            })
            .catch(error => {
                res.json({ message: 'Error finding user in database' });
            });
    }

    // POST /login/register
    register(req, res, next) {
        User.findOne({ username: req.body.username })
            .then(user => {
                if (user) {
                    res.json({ message: 'User exists' });
                } else {
                    let newUser = new User(req.body);
                    newUser.type = 'user';
                    newUser.save();
                    res.json({ message: 'User created' });
                }
            })
    }

}

module.exports = new LoginController();