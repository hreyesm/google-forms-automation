# Google Forms Automation

A generic script that fills out Google Forms automatically.

### Author

[Héctor Reyes](https://github.com/hreyesm)

## Demo

![](./img/demo.gif)

## Contents

- [Google Forms Automation](#google-forms-automation)
    - [Author](#author)
  - [Demo](#demo)
  - [Contents](#contents)
  - [Overview](#overview)
    - [Features](#features)
  - [Installation](#installation)
    - [Requirements](#requirements)
  - [Usage](#usage)
    - [JSON File Location](#json-file-location)
    - [JSON File Format](#json-file-format)
      - [URL](#url)
      - [Questions](#questions)
      - [Section End and Form End Flags](#section-end-and-form-end-flags)
    - [Graphical View](#graphical-view)
    - [Command Line View](#command-line-view)
  - [License](#license)

## Overview

JavaScript / Cypress script that fills out Google Forms automatically.

### Features

- Graphical and command line view modes.
- Forms are filled out the desired number of times from a JSON file preloaded with data.
- Fixed or probabilistic fill patterns as required.
- Support for multi-section forms with the following [question types](#questions) (dropdown is not supported):
  - Short answer
  - Paragraph
  - Multiple choice
  - Checkboxes
  - Linear scale
  - Multiple choice grid
  - Checkbox grid
  - Date
  - Time

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/) (10 or above)

Install from this repository:

```
git clone https://github.com/hreyesm/google-forms-automation
```

After cloning the repository and moving to the root directory, enter the command `npm install` to install devDependencies, including [Cypress](https://www.cypress.io/).

## Usage

### JSON File Location

JSON files corresponding to the forms to be filled out will only be processed if they are inside the [forms](./cypress/fixtures/forms) subdirectory, as in the directory tree below; otherwise the script will not recognize them.

```
📦 google-forms-automation
┣ 📂 cypress
┃ ┣ 📂 fixtures
┃ ┃ ┣ 📂 forms
┃ ┃ ┃ ┣ 📄 fixed.json
┃ ┃ ┃ ┣ 📄 probabilistic.json

```

### JSON File Format

The general structure of a JSON file supported by the script looks like the following:

```json
{
  "url": "Form URL",
  "questions": [ ... ]
}
```

For a JSON file to work properly, it must be formatted according to the guidelines below.

#### URL

Due to how Cypress redirects to web pages, the URL to be included in the JSON file should not be abbreviated. A valid URL would be https://docs.google.com/forms/d/e/1FAIpQLSfZOj6_2ryFbvfrzTyCUT6prKCP7blBJpq9SIJnwPFl4X9hRQ/viewform?usp=sf_link, while an invalid one would be https://forms.gle/2vXJ9zTJdR664c9TA. Feel free to use the first one to test the script yourself.

#### Questions

The format of the questions to be included in the JSON file will vary depending on the nature of their respective answers. **Questions must be added to the** `"questions"` **array in the exact order they appear on the original form.**

- **Short Answer**

  ```json
  {
    "title": "Question title",
    "type": "shortAnswer",
    "answer": {
      "value": "Value to fill"
    }
  }
  ```

- **Paragraph**

  ```json
  {
    "title": "Question title",
    "type": "paragraph",
    "answer": {
      "value": "Value to fill"
    }
  }
  ```

- **Multiple Choice**

  - Fixed Fill Pattern

    ```json
    {
      "title": "Question title",
      "type": "multipleChoice",
      "answer": {
        "pattern": "fixed",
        "choice": "Option to select"
      }
    }
    ```

  - Probabilistic Fill Pattern
    ```json
    {
      "title": "Question title",
      "type": "multipleChoice",
      "answer": {
        "pattern": "probabilistic",
        "options": ["Option 1", ..., "Option N"],
        "probabilities": [P("Option 1"), ..., P("Option N")]
      }
    }
    ```

- **Checkboxes**

  - Fixed Fill Pattern

    ```json
    {
      "title": "Question title",
      "type": "checkboxes",
      "answer": {
        "pattern": "fixed",
        "choice": ["Option to select 1", ..., "Option to select N"]
      }
    }
    ```

  - Probabilistic Fill Pattern
    ```json
    {
      "title": "Question title",
      "type": "checkboxes",
      "answer": {
        "pattern": "probabilistic",
        "options": ["Option 1", ..., "Option N"],
        "probabilities": [P("Option 1"), ..., P("Option N")]
      }
    }
    ```

- **Linear Scale**

  - Fixed Fill Pattern

    ```json
    {
      "title": "Question title",
      "type": "linearScale",
      "answer": {
        "pattern": "fixed",
        "choice": "Option to select"
      }
    }
    ```

  - Probabilistic Fill Pattern
    ```json
    {
      "title": "Question title",
      "type": "linearScale",
      "answer": {
        "pattern": "probabilistic",
        "options": ["Option 1", ..., "Option N"],
        "probabilities": [P("Option 1"), ..., P("Option N")]
      }
    }
    ```

- **Multiple Choice Grid**

  ```json
  {
    "title": "Question title",
    "type": "multipleChoiceGrid",
    "rows": [
      {
        "title": "Row 1",
        "answer": {
          "pattern": "fixed",
          "choice": "Column to select"
        }
      }, ...,
      {
        "title": "Row N",
        "answer": {
          "pattern": "probabilistic",
          "options": ["Column 1", ..., "Column N"],
          "probabilities": [P("Column 1"), ..., P("Column N")]
        }
      }
    ]
  }
  ```

- **Checkbox Grid**

  ```json
  {
    "title": "Question title",
    "type": "checkboxGrid",
    "rows": [
      {
        "title": "Row 1",
        "answer": {
          "pattern": "fixed",
          "choice": ["Column to select"]
        }
      }, ...,
      {
        "title": "Row N",
        "answer": {
          "pattern": "probabilistic",
          "options": ["Column 1", ..., "Column N"],
          "probabilities": [P("Column 1"), ..., P("Column N")]
        }
      }
    ]
  }
  ```

- **Date**

  ```json
  {
    "title": "Question title",
    "type": "date",
    "answer": {
      "value": "YYYY-MM-DD"
    }
  }
  ```

- **Time**

  ```json
  {
    "title": "Question title",
    "type": "time",
    "answer": {
      "value": "HH:MM"
    }
  }
  ```

#### Section End and Form End Flags

To instruct the script to go to the next section of a form, simply add a `"sectionEnd"` flag to the last question in a section:

```json
{
  "title": "Question title",
  "answer": { ... },
  "sectionEnd": true
}
```

Similarly, to instruct the script to submit the form, add a `"formEnd"` flag to the last question in the form:

```json
{
  "title": "Question title",
  "answer": { ... },
  "formEnd": true
}
```

The [example.json](./cypress/fixtures/forms/example.json) file included in this repository should give you a good idea on how to structure the form data.

### Graphical View

From the root directory, enter the following command to open the graphical Cypress Test Runner:

```
npx cypress open -e form=<Name of JSON file with form data>,n=<# of iterations>
```

For example, if we wanted the script to fill out the form specified in the [example.json](./cypress/fixtures/forms/example.json) file a total of three times, we would enter the command as follows:
![](./img/open.jpg)

If successful, the command should open a window similar to this:
![](./img/test-runner.jpg)

After that, click on the **google-forms-automation.spec.js** file shown. A Chrome window like the one below should appear:
![](./img/chrome.jpg)

The script should start running shortly after.

### Command Line View

From the root directory, enter the following command to run the command-line Cypress Test Runner:

```
npx cypress run -e form=<Name of JSON file with form data>,n=<# of iterations>
```

For example, if we wanted the script to fill out the form specified in the [example.json](./cypress/fixtures/forms/example.json) file a total of three times, we would enter the command as follows:
![](./img/run.jpg)

The script should start running shortly after. If successful, the terminal should display the following information:
![](./img/command-line.jpg)

## License

The code of this repository was implemented by [Héctor Reyes](https://github.com/hreyesm). Released under the [MIT license](./LICENSE.md).
