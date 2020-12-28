export default class GoogleFormsAutomation {
  constructor() {
    cy.fixture("selectors").then((selectors) => {
      this.selectors = selectors;
    });
  }

  fillForm = (fixture) => {
    cy.fixture(fixture).then((form) => {
      cy.visit(form.url);
      form.questions.forEach((question) => {
        cy.contains(question.title)
          .parent()
          .parent()
          .next()
          .within(() => {
            this.fillQuestion(question);
          });
        if (question.sectionEnd) {
          this.nextSection();
          cy.wait(100);
        } else if (question.formEnd) {
          this.nextSection();
        }
      });
    });
  };

  fillQuestion = (question) => {
    switch (question.type) {
      case "shortAnswer":
      case "date":
        this.type("input", question.answer.toString());
        break;
      case "paragraph":
        this.type("paragraph", question.answer.toString());
        break;
      case "time":
        this.fillTime(question.answer.toString());
        break;
      case "multipleChoice":
      case "linearScale":
        this.fillMultipleChoice(question.answer);
        break;
      case "checkboxes":
        this.fillCheckboxes(question.answer);
        break;
      case "multipleChoiceGrid":
        this.fillMultipleChoiceGrid(question.rows);
        break;
      case "checkboxGrid":
        this.fillCheckboxGrid(question.rows);
        break;
    }
  };

  click = (type) => {
    cy.get(this.selectors[type]).click();
  };

  type = (type, value) => {
    cy.get(this.selectors[type]).type(value);
  };

  fillTime = (input) => {
    const time = input.split(":");
    cy.get(this.selectors.timeInputs)
      .children(this.selectors.timeNumber)
      .each((child, i) => {
        cy.get(child).within(() => {
          this.type("input", time[i]);
        });
      });
  };

  fillMultipleChoice = (answer) => {
    const choice = this.getMultipleChoice(answer);
    cy.contains(choice).within(() => {
      this.click("multipleChoice");
    });
  };

  getMultipleChoice = (answer) => {
    if (answer.pattern == "probabilistic") {
      let s = 0;
      const options = answer.options;
      const probabilities = answer.probabilities;
      const end = probabilities.length - 1;
      for (let i = 0; i < end; i++) {
        s += probabilities[i];
        if (Math.random() < s) {
          return options[i];
        }
      }
      return options[end];
    } else if (answer.pattern == "fixed") {
      return answer.choice;
    }
  };

  fillCheckboxes = (answer) => {
    const choices = this.getCheckboxes(answer);
    choices.forEach((choice) => {
      cy.contains(choice).within(() => {
        this.click("checkbox");
      });
    });
  };

  getCheckboxes = (answer) => {
    if (answer.pattern == "probabilistic") {
      let options = [];
      const probabilities = answer.probabilities;
      const end = Math.floor(Math.random() * probabilities.length) + 1;
      for (let i = 0; i < end; i++) {
        options.push(this.getMultipleChoice(answer));
      }
      return [...new Set(options)];
    } else if (answer.pattern == "fixed") {
      return answer.choice;
    }
  };

  fillMultipleChoiceGrid = (rows) => {
    const choices = this.getMultipleChoiceGrid(rows);
    const columns = this.mapColumns();
    rows.forEach((row, i) => {
      cy.contains(row.title)
        .parent()
        .within(() => {
          this.fillGrid("multipleChoice", columns, choices[i]);
        });
    });
  };

  getMultipleChoiceGrid = (rows) => {
    let choices = [];
    rows.forEach((row) => {
      choices.push(this.getMultipleChoice(row.answer));
    });
    return choices;
  };

  fillCheckboxGrid = (rows) => {
    const choices = this.getCheckboxGrid(rows);
    const columns = this.mapColumns();
    rows.forEach((row, i) => {
      cy.contains(row.title)
        .parent()
        .within(() => {
          choices[i].forEach((choice) => {
            this.fillGrid("checkbox", columns, choice);
          });
        });
    });
  };

  getCheckboxGrid = (rows) => {
    let choices = [];
    rows.forEach((row) => {
      choices.push(this.getCheckboxes(row.answer));
    });
    return choices;
  };

  mapColumns = () => {
    let cols = {};
    cy.get(this.selectors.gridColumnHeader)
      .children(this.selectors.gridCell)
      .then((children) => {
        for (let i = 1; i <= children.length - 1; i++) {
          cols[children[i].outerText] = i;
        }
      });
    return cols;
  };

  fillGrid = (type, columns, choice) => {
    cy.get(this.selectors.gridCell)
      .eq(columns[choice])
      .within(() => {
        this.click(type);
      });
  };

  nextSection = () => {
    cy.get(this.selectors.buttons)
      .children()
      .then((children) => {
        cy.get(children[children.length - 1]).click();
      });
  };
}
