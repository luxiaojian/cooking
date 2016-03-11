var path = require('path');
var fs = require('fs');
var cwd = require('cwd');
var CONTACTS = require('./contacts');
var merge = require('webpack-merge');

module.exports = {
  loadWebpackConfig: function(type, use) {
    type = type || CONTACTS.DEV;
    use = use || CONTACTS.USEFUL.VUE;

    return require('./configs/' + use + '/webpack.' + type + '.conf');
  },

  dir: function(filePath) {
    return path.join(__dirname, '../' + filePath);
  },

  loadUserConfig: function() {
    try {
      return require(cwd('cooking.conf.js'));
    } catch(err) {
      console.error('\ncooking.conf.js not exist. please run "cooking init".\n');
      return;
    }
  },

  webpackMerge: function(a, b) {
    return merge(a, b);
  }

};