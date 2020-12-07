export default class Form {
  constructor(fixture) {
    cy.fixture(fixture).then((selectors) => {
      this.selectors = selectors;
    });
  }

  fill(fixture) {
    cy.fixture(fixture).then((form) => {
      form.questions.forEach((question) => {
        cy.contains(question.title)
          .parent()
          .parent()
          .next()
          .within(() => {
            this.fillQuestion(question.answer);
          });
        if (question.sectionEnd) {
          cy.contains("Siguiente").click();
        } else if (question.formEnd) {
          cy.contains("Enviar").click();
        }
      });
    });
  }

  fillQuestion(answer) {
    switch (answer.type) {
      case "shortAnswer":
        this.type("input", answer.value.toString());
        break;
      case "paragraph":
        this.type("paragraph", answer.value.toString());
        break;
      case "date":
        this.type("input", answer.value.toString());
        break;
      case "time":
        this.fillTime(answer.value.toString());
        break;
      case "multipleChoice":
        this.fillMultipleChoice(answer.choice);
        break;
      case "checkbox":
        this.fillCheckbox(answer.choices);
        break;
      case "linearScale":
        this.fillMultipleChoice(answer.choice);
        break;
      case "multipleChoiceGrid":
        this.fillMultipleChoiceGrid(answer.choices);
        break;
      case "checkboxGrid":
        this.fillCheckboxGrid(answer.choices);
        break;
    }
  }

  type(type, value) {
    if (type == "input") {
      cy.get(this.selectors.input).type(value);
    } else if (type == "paragraph") {
      cy.get(this.selectors.paragraph).type(value);
    }
  }

  click(type) {
    if (type == "multipleChoice") {
      cy.get(this.selectors.multipleChoice).click();
    } else if (type == "checkbox") {
      cy.get(this.selectors.checkbox).click();
    }
  }

  fillTime(input) {
    let time = input.split(".");
    cy.get(this.selectors.timeInputs)
      .children(this.selectors.timeNumber)
      .then((children) => {
        cy.get(children[0]).within(() => {
          this.type("input", time[0]);
        });
        cy.get(children[1]).within(() => {
          this.type("input", time[1]);
        });
      });
  }

  fillMultipleChoice(choice) {
    cy.contains(choice).within(() => {
      this.click("multipleChoice");
    });
  }

  fillCheckbox(choices) {
    choices.forEach((choice) => {
      cy.contains(choice).within(() => {
        this.click("checkbox");
      });
    });
  }

  fillMultipleChoiceGrid(choices) {
    let cols;
    cy.contains(choices[0].row)
      .parent()
      .parent()
      .prev()
      .children(this.selectors.gridCell)
      .then((children) => {
        cols = this.mapColumns(children, choices.length);
      });
    choices.forEach((choice) => {
      cy.contains(choice.row)
        .parent()
        .within(() => {
          this.fillGrid("multipleChoice", cols, choice.column);
        });
    });
  }

  fillCheckboxGrid(choices) {
    let cols;
    cy.contains(choices[0].row)
      .parent()
      .prev()
      .children(this.selectors.gridCell)
      .then((children) => {
        cols = this.mapColumns(children, choices.length);
      });
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

  mapColumns(children, n) {
    let cols = {};
    for (let i = 1; i <= n; i++) {
      cols[children[i].outerText] = i;
    }
    return cols;
  }

  fillGrid(type, cols, c) {
    cy.get(this.selectors.gridCell)
      .eq(cols[c])
      .within(() => {
        this.click(type);
      });
  }
}
