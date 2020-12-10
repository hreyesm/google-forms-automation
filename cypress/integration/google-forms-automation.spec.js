import GoogleFormsAutomation from "../google-forms-automation";

describe("Google Forms Automation", () => {
  let gfa;
  const form = Cypress.env("form");
  const n = Cypress.env("n");

  before(() => {
    gfa = new GoogleFormsAutomation();
  });

  for (let i = 1; i <= n; i++) {
    it("Iteration " + i, () => {
      gfa.fillForm("forms/" + form);
    });
  }
});
