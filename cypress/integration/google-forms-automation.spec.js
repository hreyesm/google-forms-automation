import GoogleFormsAutomation from "../google-forms-automation";

describe("Google Forms Automation", () => {
  before(() => {
    cy.visit(
      "https://docs.google.com/forms/d/e/1FAIpQLSfZOj6_2ryFbvfrzTyCUT6prKCP7blBJpq9SIJnwPFl4X9hRQ/viewform"
    );
  });

  it("Example", () => {
    const googleFormsAutomation = new GoogleFormsAutomation();
    googleFormsAutomation.fillForm("example");
  });
});
