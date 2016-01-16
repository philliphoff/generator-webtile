'use strict';

var concat = require('concat-stream');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var unzip = require('unzip');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
      
        this.argument(
            'webtile', 
            { 
                type: String,  
                required: false,
                desc: 'A path to an existing Web Tile.'
            });
    },
  
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the fine ' + chalk.red('generator-webtile') + ' generator!'
        ));

        var namePrompt = 
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of this Web Tile?',
                default: this.appname
            };
            
        var descriptionPrompt =
            {
                type: 'input',
                name: 'description',
                message: 'What does this Web Tile do?',
            };
        
        var authorPrompt = 
            {
                type: 'input',
                name: 'author',
                message: 'Who is the author of this Web Tile?',
                store: true
            };
        
        var emailPrompt = 
            {
                type: 'input',
                name: 'email',
                message: 'What is the author\'s email address?',
                store: true  
            };
            
        var organizationPrompt =
            {
                type: 'input',
                name: 'organization',
                message: 'To which organization does the author belong?',
                store: true
            };
            
        var refreshIntervalPrompt =
            {
                type: 'input',
                name: 'refreshInterval',
                message: 'How often should this Web Tile be updated (in minutes)?',
                default: 60
            };
            
        var prompts;
        
        if (this.webtile) {
            prompts =
            [
                namePrompt   
            ];
        } 
        else {
            prompts = 
            [
                namePrompt,
                descriptionPrompt,
                authorPrompt,
                emailPrompt,
                organizationPrompt,
                refreshIntervalPrompt
            ]
        }

        this.prompt(prompts, function (props) {
        this.props = props;
        // To access props later use this.props.someOption;

        done();
        }.bind(this));
    },

    writing: function () {
      
        var copyBaseFiles = function() {
            this.fs.copy(
                this.templatePath('gitignore'),
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
                this.templatePath('package.json'),
                this.destinationPath('package.json'),
                this.props
            );
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'),
                this.props
            );
        }.bind(this);   
      
        var done = this.async();
        var that = this;
        
        if (this.webtile) {
            fs
                .createReadStream(this.webtile)
                .pipe(unzip.Parse())
                .on('entry', function(entry) {
                    entry.pipe(concat(function(buffer) {
                        that.fs.write(that.destinationPath(entry.path), buffer);
                    }));
                })
                .on('close', function() {
                    var manifest = that.fs.readJSON(that.destinationPath('manifest.json'));
                    
                    that.props.description = manifest.description;
                    that.props.author = manifest.author;
                    that.props.organization = manifest.organization;
                    that.props.email = manifest.contactEmail;
                    that.refreshInterval = manifest.refreshIntervalMinutes;
                
                    copyBaseFiles();
                    
                    done(); 
                });               
        }
        else {
            
            copyBaseFiles();
            
            this.fs.copy(
                this.templatePath('icons/tileIcon.png'),
                this.destinationPath('icons/tileIcon.png')
            );
            this.fs.copyTpl(
                this.templatePath('manifest.json'),
                this.destinationPath('manifest.json'),
                this.props
            );
            this.fs.copy(
                this.templatePath('sample.json'),
                this.destinationPath('sample.json')
            );
            
            done();
        }
    },

    install: function () {
        this.installDependencies();
    }
});
