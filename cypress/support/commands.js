// Login with all users
Cypress.Commands.add('login', (type) => {
    cy.fixture('data').then((data) => {
        const formData = data[type];
        cy.get('#user-name').clear().type(formData.Username);
        cy.get('#password').clear().type(formData.Password);
        cy.get('#login-button').click();
    });
});

// Add products to the cart -> what happens if the user has left an item in the cart
Cypress.Commands.add('addProductsToCart', () => {
    cy.wait(2000); // Waiting to ensure the page loads fully
    const productSelectors = [
        '#add-to-cart-sauce-labs-backpack',
        '#add-to-cart-sauce-labs-bike-light',
        '#add-to-cart-sauce-labs-bolt-t-shirt',
        '#add-to-cart-sauce-labs-fleece-jacket',
        '#add-to-cart-sauce-labs-onesie',
        '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'
    ];

    // Add each product to the cart
    productSelectors.forEach(selector => cy.get(selector).click());
    
    cy.scrollTo('top');
    cy.get('[data-test="shopping-cart-link"]').click();
});

// Command for the checkout of user 1
Cypress.Commands.add('completeCheckout', (type) => {
    cy.fixture('data').then((data) => {
        const formData = data[type];
        cy.get('#checkout').click();
        cy.get('#first-name').clear().type(formData.FirstName);
        cy.get('#last-name').clear().type(formData.LastName);
        cy.get('#postal-code').clear().type(formData.postalCode);
        cy.get('#continue').click();
    });
});

// Validate that the checkout has been completed
Cypress.Commands.add('validateCheckoutCompletion', () => {
    cy.contains('Payment Information:').should('exist');
    cy.get('[data-test="payment-info-value"]').should('exist');
    cy.contains('Shipping Information:').should('exist');
    cy.get('[data-test="shipping-info-value"]').should('exist');
    cy.contains('Price Total').should('exist');
    cy.get('[data-test="subtotal-label"]').should('exist');
    cy.get('[data-test="tax-label"]').should('exist');
    cy.get('[data-test="total-label"]').should('exist');
    cy.get('#finish').click();
});

// Perform the logout
Cypress.Commands.add('performLogout', () => {
    cy.fixture('data').then(() => {
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
    });
});