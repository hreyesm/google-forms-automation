export default class GoogleFormsAutomation {
  constructor() {
    cy.fixture("selectors").then((selectors) => {
      this.selectors = selectors;
    });
  }

  fillForm(fixture) {
    cy.fixture(fixture).then((form) => {
      cy.visit(form.url);
      form.questions.forEach((question) => {
        cy.contains(question.title)
          .parent()
          .parent()
          .next()
          .within(() => {
            this.fillQuestion(question.answer);
          });
        if (question.sectionEnd) {
          this.nextSection();
          cy.wait(100);
        } else if (question.formEnd) {
          this.nextSection();
        }
      });
    });
  }

  fillQuestion(answer) {
    let choice;
    switch (answer.type) {
      case "shortAnswer":
      case "date":
        this.type("input", answer.value.toString());
        break;
      case "paragraph":
        this.type("paragraph", answer.value.toString());
        break;
      case "time":
        this.fillTime(answer.value.toString());
        break;
      case "multipleChoice":
      case "linearScale":
        choice = this.getMultipleChoice(answer);
        this.fillMultipleChoice(choice);
        break;
      case "multipleChoiceGrid":
        this.fillMultipleChoiceGrid(answer.choice);
        break;
      case "checkboxes":
        choice = this.getCheckboxes(answer);
        this.fillCheckboxes(choice);
        break;
      case "checkboxGrid":
        this.fillCheckboxGrid(answer.choice);
        break;
    }
  }

  click(type) {
    cy.get(this.selectors[type]).click();
  }

  type(type, value) {
    cy.get(this.selectors[type]).type(value);
  }

  fillTime(input) {
    const time = input.split(":");
    cy.get(this.selectors.timeInputs)
      .children(this.selectors.timeNumber)
      .each((child, index) => {
        cy.get(child).within(() => {
          this.type("input", time[index]);
        });
      });
  }

  getMultipleChoice(answer) {
    if (answer.pattern == "probabilistic") {
      let s = 0;
      const options = answer.choice.options,
        probabilities = answer.choice.probabilities,
        end = probabilities.length - 1;
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
  }

  fillMultipleChoice(choice) {
    cy.contains(choice).within(() => {
      this.click("multipleChoice");
    });
  }

  fillMultipleChoiceGrid(choices) {
    const cols = this.mapColumns(choices.length);
    choices.forEach((choice) => {
      cy.contains(choice.row)
        .parent()
        .within(() => {
          this.fillGrid("multipleChoice", cols, choice.column);
        });
    });
  }

  getCheckboxes(answer) {
    if (answer.pattern == "probabilistic") {
      let options = [];
      const probabilities = answer.choice.probabilities,
        end = Math.floor(Math.random() * probabilities.length) + 1;
      for (let i = 0; i < end; i++) {
        options.push(this.getMultipleChoice(answer));
      }
      return [...new Set(options)];
    } else if (pattern == "fixed") {
      return answer.choice.options;
    }
  }

  fillCheckboxes(choices) {
    choices.forEach((choice) => {
      cy.contains(choice).within(() => {
        this.click("checkbox");
      });
    });
  }

  fillCheckboxGrid(choices) {
    const cols = this.mapColumns(choices.length);
    choices.forEach((choice) => {
      cy.contains(choice.row)
        .parent()
        .within(() => {
          choice.columns.forEach((c) => {
            this.fillGrid("checkbox", cols, c);
          });
        });
    });
  }

  mapColumns(n) {
    let cols = {};
    cy.get(this.selectors.gridColumnHeader)
      .children(this.selectors.gridCell)
      .then((children) => {
        for (let i = 1; i <= n; i++) {
          cols[children[i].outerText] = i;
        }
      });
    return cols;
  }

  fillGrid(type, cols, c) {
    cy.get(this.selectors.gridCell)
      .eq(cols[c])
      .within(() => {
        this.click(type);
      });
  }

  nextSection() {
    cy.get(this.selectors.buttons)
      .children()
      .then((children) => {
        cy.get(children[children.length - 1]).click();
      });
  }
}
