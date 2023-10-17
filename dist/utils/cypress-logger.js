export function cyLog(message, object = undefined) {
    console.log(message, JSON.stringify(object, null, 4));
    // using cy.log() results in failed tests because it's not allowd in a Cypress promise
    Cypress.log({
        message: `${message} - ${JSON.stringify(object, null, 4)}`,
        consoleProps: () => {
            return { message, object };
        },
    });
}
//# sourceMappingURL=cypress-logger.js.map