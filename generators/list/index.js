var yeoman = require('yeoman-generator');
var spforms = require('spforms');
// yo spforms:spform
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
  },

  generateListForm: function() {
    var Cpass = require("cpass");
    var cpass = new Cpass();
    var pass = cpass.decode(this.config.get('password'));
    var username = this.config.get('username');
    var siteurl = this.config.get('siteUrl');
    var spformsHelper = spforms({username:username, password: pass});

    var defaultListTitle = this.config.get('listTitle') || ''
    var self = this;
    
    spformsHelper.getLists({siteUrl: siteurl}).then(function(lists){
      var prompts = (function() {
          return [{
              type: 'list',
              name: 'listTitle',
              message: 'Choose List',
              choices: lists,
              default: defaultListTitle
          }];
      }.bind(self))();

      self.prompt(prompts).then(function (answers) {
          self.config.set('listTitle', answers.listTitle);
          var listTitle = answers.listTitle;

          var listSettings = {
            siteUrl: self.config.get('siteUrl'),
            listTitle: self.config.get('listTitle'),
            sourcePath: self.config.get('dlRootFolder'), //root-relative path on the disk
            assetsUrl: self.config.get('spRootFolder') //Assets folder Url
          };

          //Generate forms based on the selected list
          spformsHelper.generateAngularForm(listSettings);
          console.log('Adding Attachments list');
          //Add Attachments list
          spformsHelper.createList(listSettings, listSettings);

      }.bind(this));
    });

  }
});