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
  * [JSON File Structure](#json-file-structure)
  * [Graphical View](#graphical-view)
  * [Command Line View](#command-line-view)
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

### JSON File Structure
The [example.json](./cypress/fixtures/example.json) file included in this repository is structured in such a way that the script runs without errors. For a JSON file to work properly, it must be created according to the following guidelines.

#### URL
```json
"url": "https://docs.google.com/forms/d/e/1FAIpQLSfZOj6_2ryFbvfrzTyCUT6prKCP7blBJpq9SIJnwPFl4X9hRQ/viewform"
```

#### Questions
* **Short Answer**
  ```json
  {
      "title": "Short Answer",
      "answer": {
        "type": "shortAnswer",
        "value": "Lorem ipsum."
      }
  }
  ```

### Graphical View
From the root directory, enter the following command to open the graphical Cypress Test Runner:
```
npx cypress open -e form=<name of JSON file with form data>,n=<# of iterations>
```
For example, if we wanted the script to fill out the form specified in the [example.json](./cypress/fixtures/example.json) file a total of three times, we would enter the command as follows:
![](./img/open.jpg)

If successful, the command should open a window similar to this:
![](./img/test-runner.jpg)

After that, click on the **google-forms-automation.spec.js** file shown. A Chrome window like the one below should appear:
![](./img/chrome.jpg)

The script should start running shortly after.

### Command Line View
From the root directory, enter the following command to run the command-line Cypress Test Runner:
```
npx cypress run -e form=<name of JSON file with form data>,n=<# of iterations>
```
For example, if we wanted the script to fill out the form specified in the [example.json](./cypress/fixtures/example.json) file a total of three times, we would enter the command as follows:
![](./img/run.jpg)

The script should start running shortly after. If successful, the terminal should display the following information:
![](./img/command-line.jpg)

## License
The code of this repository was implemented by [Héctor Reyes](https://github.com/hreyesm). Released under the [MIT license](./LICENSE).
