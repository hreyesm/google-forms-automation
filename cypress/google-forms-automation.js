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
        this.fillMultipleChoice(answer.choice);
        break;
      case "linearScale":
        this.fillMultipleChoice(answer.choice);
        break;
      case "multipleChoiceGrid":
        this.fillMultipleChoiceGrid(answer.choices);
        break;
      case "checkbox":
        this.fillCheckbox(answer.choices);
        break;
      case "checkboxGrid":
        this.fillCheckboxGrid(answer.choices);
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
    const time = input.split(".");
    cy.get(this.selectors.timeInputs)
      .children(this.selectors.timeNumber)
      .each((child, index) => {
        cy.get(child).within(() => {
          this.type("input", time[index]);
        });
      });
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

  fillCheckbox(choices) {
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
