/**
 * Created by rikoizz on 16-7-8.
 */
var config = require('../../../config.json');
var db = require('../models')(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    config.mysql.config
);
db.sync();

module.exports = db;