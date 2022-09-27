const router = require('express').Router(); //mini app
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.send('Wrong route!');
});

module.exports = router;