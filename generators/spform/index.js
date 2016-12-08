var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var path = require('path');
var colors = require('colors');
var yosay = require('yosay');
var spforms = require('spforms');


// CALL THIS SUBGENERATOR:
// yo spforms:spform

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
  },

  getListTitle: function() {
      var prompts = (function() {
          return [{
              type: 'input',
              name: 'listTitle',
              message: 'Enter List Title',
              default: this.config.get('listTitle') || 'TestList'
          }];
      }.bind(this))();

      this._getArrayOfLists();

      this.prompt(prompts).then(function (answers) {
          var appName = this.config.set('listTitle', answers.listTitle);
      }.bind(this));
  },
  _getArrayOfLists: function(){
    console.log('private method called');
    //Return promose..
  },

  saveConfig: function(){
    console.log('running this.config.save()...');
    this.config.save();
  },

  initializing   : {
    method4: function(){console.log('initializing  ')},
  },
  _prompting: function () {

  },
  configuring   : {
    //method4: function(){console.log('configuring  '); this.method1()}
  },
  default   : {
    //method4: function(){console.log('default  ')},
  },
  writing   : {
    //method4: function(){console.log('writing  ')},
  },
  conflicts   : {
    //method4: function(){console.log('conflicts  ')},
  },
  install   : {
    //method4: function(){console.log('install  ')},
  },
  end    : {
    //method4: function(){console.log('end  spforms ')},
  }
});