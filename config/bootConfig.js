/*
 * Boot configuration
 */
require('./index');

// boot modules using bridges, so they load propper 
// dependenies according to configuraion
require('../src/services/i2fasServ');
require('../src/services/stsServ');