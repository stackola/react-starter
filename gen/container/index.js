'use strict';
var fs = require('fs');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
module.exports = class extends Generator {
  prompting() {
    this.correctFolder = fs.existsSync(this.destinationPath('src/containers/'));
    if (!this.correctFolder) {
      this.log(yosay(`${chalk.red('You´re not in the right directory')}`));
      return;
    }
    this.log(yosay(`Generate a react ${chalk.red('container')}!`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'containerName',
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    if (!this.correctFolder){
      return;
    }
    this.fs.copyTpl(
      this.templatePath('index.jsx'),
      this.destinationPath('src/containers/' + this.props.name + '/index.jsx'),
      {
        name:
          this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1),
        slug: this.props.name,
      }
    );
    this.fs.copyTpl(
      this.templatePath('file.jsx'),
      this.destinationPath('src/containers/' + this.props.name + '/'+ this.props.name +'.jsx'),
      {
        name:
          this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1),
        slug: this.props.name,
      }
    );
    this.fs.copyTpl(
      this.templatePath('style.less'),
      this.destinationPath('src/containers/' + this.props.name + '/'+this.props.name+'.less'),
      {
        name:
          this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1),
        slug: this.props.name,
      }
    );
  }
};
