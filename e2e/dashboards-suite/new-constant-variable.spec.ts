import { e2e } from '@grafana/e2e';

const PAGE_UNDER_TEST = 'kVi2Gex7z/test-variable-output';

describe('Variables - Constant', () => {
  it('can add a new text box variable', () => {
    e2e.flows.login('admin', 'admin');
    e2e.flows.openDashboard({ uid: `${PAGE_UNDER_TEST}?orgId=1&editview=templating` });

    // Create a new "Constant" variable
    e2e.components.CallToActionCard.buttonV2('Add variable').click();

    e2e.pages.Dashboard.Settings.Variables.Edit.General.generalTypeSelect().type('Constant{enter}');
    e2e.pages.Dashboard.Settings.Variables.Edit.General.generalNameInput().clear().type('VariableUnderTest').blur();
    e2e.pages.Dashboard.Settings.Variables.Edit.General.generalLabelInput().type('Variable under test').blur();
    e2e.pages.Dashboard.Settings.Variables.Edit.ConstantVariable.constantOptionsQueryInput().type('pesto').blur();

    e2e.pages.Dashboard.Settings.Variables.Edit.General.previewOfValuesOption().eq(0).should('have.text', 'pesto');

    // Navigate back to the homepage and change the selected variable value
    e2e.pages.Dashboard.Settings.Variables.Edit.General.submitButton().click();
    e2e.components.BackButton.backArrow().should('be.visible').click({ force: true });
    e2e.components.RefreshPicker.runButtonV2().click();

    // Assert it was rendered
    e2e().get('.markdown-html').should('include.text', 'VariableUnderTest: pesto');

    // Assert the variable is not visible in the dashboard nav
    e2e.pages.Dashboard.SubMenu.submenuItemLabels('Variable under test').should('not.exist');
  });
});
