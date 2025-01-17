import { e2e } from '@grafana/e2e';

const PAGE_UNDER_TEST = 'kVi2Gex7z/test-variable-output';

describe('Variables - Text box', () => {
  it('can add a new text box variable', () => {
    e2e.flows.login('admin', 'admin');
    e2e.flows.openDashboard({ uid: `${PAGE_UNDER_TEST}?orgId=1&editview=templating` });

    // Create a new "Custom" variable
    e2e.components.CallToActionCard.buttonV2('Add variable').click();

    e2e.pages.Dashboard.Settings.Variables.Edit.General.generalTypeSelect().type('Text box{enter}');
    e2e.pages.Dashboard.Settings.Variables.Edit.General.generalNameInput().clear().type('VariableUnderTest').blur();
    e2e.pages.Dashboard.Settings.Variables.Edit.General.generalLabelInput().type('Variable under test').blur();
    e2e.pages.Dashboard.Settings.Variables.Edit.TextBoxVariable.textBoxOptionsQueryInput().type('cat-dog').blur();

    e2e.pages.Dashboard.Settings.Variables.Edit.General.previewOfValuesOption().eq(0).should('have.text', 'cat-dog');

    // Navigate back to the homepage and change the selected variable value
    e2e.pages.Dashboard.Settings.Variables.Edit.General.submitButton().click();
    e2e.components.BackButton.backArrow().should('be.visible').click({ force: true });
    e2e().get('#VariableUnderTest').clear().type('dog-cat').blur();

    // Assert it was rendered
    e2e().get('.markdown-html').should('include.text', 'VariableUnderTest: dog-cat');
  });
});
