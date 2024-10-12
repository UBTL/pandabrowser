const config = require("../../config");
const mysqlDb = require("./connectDB.mysql");
const sqliteDb = require("./connectDB.sqlite");

/**
 * @type {typeof import("./connectDB.mysql")|typeof import("./connectDB.sqlite")}
 */
module.exports = config.dbType == 'sqlite' ? sqliteDb : mysqlDb;