# Google Forms Automation
A generic script that fills out Google Forms automatically.

### Author
[Héctor Reyes](https://github.com/hreyesm)

## Demo
![](./img/demo.gif)

## Contents
* [Overview](#overview)
  * [Features](#features)
* [Installation](#installation)
  * [Requirements](#requirements)
* [Usage](#usage)
* [License](#license)

## Overview
JavaScript / Cypress script that fills out Google Forms automatically.

### Features
* Graphical and command line view modes.
* Forms are filled out the desired number of times from a JSON file preloaded with data.
* Support for multi-section forms with the following question types (dropdown is not supported):
  * Short answer
  * Paragraph
  * Multiple choice
  * Checkboxes
  * Linear scale
  * Multiple choice grid
  * Checkbox grid
  * Date
  * Time
 
## Installation

### Requirements
* [Node.js](https://nodejs.org/en/) (10 or above)

Install from this repository:
```
git clone https://github.com/hreyesm/google-forms-automation
```

After cloning the repository and moving to the root directory, enter the command `npm install` to install devDependencies, including [Cypress](https://www.cypress.io/).

## Usage

### Graphical View Mode
From the root directory, enter the following command to open the Cypress Test Runner:
```
npx cypress open -e form=<name of JSON file with form data>,n=<# of iterations>
```
For example, if we wanted the script to fill out the form specified in the [example.json](./cypress/fixtures/example.json) file a total of three times, we would enter the command as follows:
![](./img/open.jpg)

If successful, the command should open a window similar to this:
![](./img/test-runner.jpg)

After that, click on the displayed **google-forms-automation.spec.js** file. A Chrome window like the one below should open:
![](./img/chrome.jpg)

The script should start running shortly after.

### Command Line View Mode
From the root directory, enter the following command to open the Cypress Test Runner:
```
npx cypress run -e form=<name of JSON file with form data>,n=<# of iterations>
```
For example, if we wanted the script to fill out the form specified in the [example.json](./cypress/fixtures/example.json) file a total of three times, we would enter the command as follows:
![](./img/run.jpg)

The script should start running shortly after. If successful, the command should display the following information:
![](./img/command-line.jpg)

## License
The code of this repository was implemented by [Héctor Reyes](https://github.com/hreyesm). Released under the [MIT license](./LICENSE).
