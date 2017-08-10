const config = require('../app/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.Config.url, {
    useMongoClient: true,
});