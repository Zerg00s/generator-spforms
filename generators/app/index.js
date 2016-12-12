var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var path = require('path');
var colors = require('colors');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.settings = { };
  },
   
  tenant: function() {
      var prompts = (function() {
          return [{
              type: 'input',
              name: 'siteUrl',
              message: 'SharePoint Site Url',
              default: this.config.get('siteUrl') || 'https://contoso.sharepoint.com'
          }];
      }.bind(this))();

      return this.prompt(prompts).then(function (answers) {
          _.assignIn(this.settings, answers);
      }.bind(this));
  },
  auth: function() {
      var prompts = (function() {
          var promptFor = [];
          if (this.settings.siteUrl.indexOf(".sharepoint.com") === -1) {
              promptFor.push({
                  type: 'input',
                  name: 'domain',
                  message: 'Domain', //  (only for On-Premises)
                  default: this.config.get('domain') || null
              });
          }
          promptFor.push({
              type: 'input',
              name: 'username',
              message: 'SharePoint User Name',
              default: this.config.get('username') || 'username'
          });
          promptFor.push({
              type: 'password',
              name: 'password',
              message: 'SharePoint User Password'
          });
          return promptFor;
      }.bind(this))();

      return this.prompt(prompts).then(function (answers) {
          var Cpass = require("cpass");
          var cpass = new Cpass();
          answers.password = cpass.encode(answers.password);
          _.assignIn(this.settings, answers);
      }.bind(this));
  },
  mapping: function() {
      var prompts = (function() {
          return [{
              type: 'input',
              name: 'spRootFolder',
              message: 'SharePoint Root Folder',
              default: this.config.get('spRootFolder') || '_catalogs/masterpage/spf'
          }, {
              type: 'input',
              name: 'dlRootFolder',
              message: 'Project Sync Folder',
              default: this.config.get('dlRootFolder') || './src'
          }];
      }.bind(this))();

      return this.prompt(prompts).then(function (answers) {
          _.assignIn(this.settings, answers);
      }.bind(this));
  },

  configure: function () {
    for (var prop in this.settings) {
      console.log(prop);
        if (this.settings.hasOwnProperty(prop) && prop !== 'password') {
            this.config.set(prop, this.settings[prop]);
        }
        else{
           var Cpass = require("cpass");
                var cpass = new Cpass();
                this.config.set(prop, cpass.encode(this.settings[prop]));
        }
    }
    this.config.save();
  }
 
});