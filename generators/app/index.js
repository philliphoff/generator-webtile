'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fine ' + chalk.red('generator-webtile') + ' generator!'
    ));

    var prompts = 
    [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of this Web Tile?',
            default: this.appname
        },
        {
            type: 'input',
            name: 'description',
            message: 'What does this Web Tile do?',
        },
        {
            type: 'input',
            name: 'author',
            message: 'Who is the author of this Web Tile?',
            store: true
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the author\'s email address?',
            store: true  
        },
        {
            type: 'input',
            name: 'organization',
            message: 'To which organization does the author belong?',
            store: true
        },
        {
            type: 'input',
            name: 'refreshInterval',
            message: 'How often should this Web Tile be updated (in minutes)?',
            default: 60
        }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('icons/tileIcon.png'),
      this.destinationPath('icons/tileIcon.png')
    );
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('manifest.json'),
      this.destinationPath('manifest.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
    );
    this.fs.copy(
      this.templatePath('sample.json'),
      this.destinationPath('sample.json')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
