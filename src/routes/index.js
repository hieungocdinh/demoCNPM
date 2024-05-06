const loginRoute = require('./login');
const adminRoute = require('./admin');
const userRoute = require('./user')

function router(app) {
    app.use('/user', userRoute)
    app.use('/admin', adminRoute)
    app.use('/login', loginRoute)
    app.use('/', loginRoute)
}

module.exports = router;
