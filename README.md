# Google Forms Automation

A generic script that fills out Google Forms automatically.

### Author

[Héctor Reyes](https://github.com/hreyesm)

## Demo

![](./img/demo.gif)

## Contents

  - [Overview](#overview)
    - [Features](#features)
  - [Installation](#installation)
    - [Requirements](#requirements)
  - [File Configuration](#file-configuration)
    - [JSON File Location](#json-file-location)
    - [JSON File Format](#json-file-format)
      - [URL](#url)
      - [Questions](#questions)
      - [Section and Form End Flags](#section-and-form-end-flags)
    - [Examples](#examples)
  - [Usage](#usage)
    - [Graphical View](#graphical-view)
    - [Command Line View](#command-line-view)
  - [License](#license)

## Overview

JavaScript / Cypress script that fills out Google Forms automatically. Useful for submitting the same form multiple times, either from fixed values or based on probabilities.

### Features

- Graphical and command line view modes.
- Forms are filled out the desired number of times from a JSON file preloaded with data.
- Support for multi-section forms in any language.
- Fixed fill pattern for the following question types:
  - Short answer
  - Paragraph
  - Date
  - Time
- Fixed and probabilistic fill patterns for the following question types:
  - Multiple choice
  - Linear scale
  - Checkboxes
  - Multiple choice grid
  - Checkbox grid

## Installation

#### Requirements

- [Node.js](https://nodejs.org/en/) (10 or above)

Install from this repository:

```
git clone https://github.com/hreyesm/google-forms-automation
```

After cloning the repository, go to the root directory and enter the command `npm install` to install [Cypress](https://www.cypress.io/).

## File Configuration

### JSON File Location

JSON files corresponding to the forms to be submitted will only be processed if they are inside the [forms](./cypress/fixtures/forms) subdirectory, as in the directory tree below; otherwise the script will not recognize them.

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

```
{
  "url": "https://example.com",
  "questions": [ ... ]
}
```

For a JSON file to work properly, it must be formatted according to the guidelines below.

#### URL

Due to how Cypress redirects to web pages, the URL to be included in the JSON file **should not be abbreviated**. For example, a valid URL would be https://docs.google.com/forms/d/e/1FAIpQLSfZOj6_2ryFbvfrzTyCUT6prKCP7blBJpq9SIJnwPFl4X9hRQ/viewform?usp=sf_link, while an invalid one would be https://forms.gle/2vXJ9zTJdR664c9TA. Feel free to use the first one to test the script yourself.

#### Questions

The format of the questions to be included in the JSON file will vary depending on the nature of their respective answers. **Questions must be added to the** `"questions"` **array in the exact order they appear on the original form.**

- **Fixed Fill Pattern:** Can only be filled out from a fixed value.

  - Short Answer

    ```
    {
      "title": "Question title",
      "type": "shortAnswer",
      "answer": "Value to fill"
    }
    ```

  - Paragraph

    ```
    {
      "title": "Question title",
      "type": "paragraph",
      "answer": "Value to fill"
    }
    ```

  - Date

    ```
    {
      "title": "Question title",
      "type": "date",
      "answer": "YYYY-MM-DD"
    }
    ```

  - Time

    ```
    {
      "title": "Question title",
      "type": "time",
      "answer": "HH:MM"
    }
    ```

- **Fixed / Probabilistic Fill Patterns:** Can be filled out from a fixed value, based on the probability assigned to each individual option, or, in the case of grid-type questions, a combination of both. For probability-based filling, all options must be listed followed by their respective probabilities so that the sum of the `"probabilities"` array equals **1.0**. The following JSON snippet, for example, ensures that there is a 40% chance that the script will choose "Option 1", a 30% chance that it will choose "Option 2" a 20% chance that it will choose "Option 3", and a 10% chance that it will choose "Option 4":

  ```
  "answer": {
    "pattern": "probabilistic",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "probabilities": [0.4, 0.3, 0.2, 0.1]
  }
  ```

  - Multiple Choice

    - Fixed Fill Pattern

      ```
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

      ```
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

  - Linear Scale

    - Fixed Fill Pattern

      ```
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

      ```
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

  - Checkboxes

    - Fixed Fill Pattern

      ```
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

      ```
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

  - Multiple Choice Grid (Fixed and Probabilistic Fill Patterns)

    ```
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
        },
        ...,
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

  - Checkbox Grid (Fixed and Probabilistic Fill Patterns)

    ```
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
        },
        ...,
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

#### Section and Form End Flags

To instruct the script to go to the next section of a form, simply add a `"sectionEnd"` flag to the last question in a section:

```
{
  "title": "Question title",
  "type": "questionType",
  "answer": { ... },
  "sectionEnd": true
}
```

Similarly, to submit a form, add a `"formEnd"` flag to the last question in the form:

```
{
  "title": "Question title",
  "type": "questionType",
  "answer": { ... },
  "formEnd": true
}
```

### Examples

The [fixed.json](./cypress/fixtures/forms/fixed.json) and [probabilistic.json](./cypress/fixtures/forms/probabilistic.json) files included in this repository should give you a good idea on how to properly structure the form data.

## Usage

### Graphical View

From the root directory, enter the following command to open the graphical Cypress Test Runner:

```
npx cypress open -e FORM=<Name of JSON file with form data>,N=<# of iterations>
```

For example, if we wanted the script to fill out the form specified in the [fixed.json](./cypress/fixtures/forms/fixed.json) file a total of three times, we would enter the command as follows:
![](./img/open.jpg)

If successful, the command should open a window similar to this:
![](./img/test-runner.jpg)

After that, click on the **google-forms-automation.spec.js** file shown. A Chrome window like the one below should appear:
![](./img/chrome.jpg)

The script should start running shortly after.

### Command Line View

From the root directory, enter the following command to run the command-line Cypress Test Runner:

```
npx cypress run -e FORM=<Name of JSON file with form data>,N=<# of iterations>
```

For example, if we wanted the script to fill out the form specified in the [fixed.json](./cypress/fixtures/forms/fixed.json) file a total of three times, we would enter the command as follows:
![](./img/run.jpg)

The script should start running shortly after. If successful, the terminal should display the following information:
![](./img/command-line.jpg)

## License

The code of this repository was implemented by [Héctor Reyes](https://github.com/hreyesm). Released under the [MIT license](./LICENSE.md).
