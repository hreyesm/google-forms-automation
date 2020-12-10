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
  * [Example](#example)
* [License](#license)

## Overview
JavaScript / Cypress script that fills out Google Forms automatically.

### Features
* Graphical and command line preview modes.
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

### Graphical Preview Mode
From the root directory, enter the following command to open the Cypress Test Runner:
```
npx cypress open --env form=<name of the JSON file preloaded with data>,n=<number of times to fill out the form>
```

If successful, the command should open a window similar to this:
![](./img/test-runner.jpg)

Then click on the "google-forms-automation.spec.js" file. A Chrome window like the one below should open:
![](./img/loading.jpg)

The script should start running shortly after.
![](./img/chrome.jpg)

## License
The code of this repository was implemented by [Héctor Reyes](https://github.com/hreyesm). Released under the [MIT license](./LICENSE).
