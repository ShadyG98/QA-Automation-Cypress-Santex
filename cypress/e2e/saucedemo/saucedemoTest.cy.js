describe('Saucedemo Test Suite', { testIsolation: false }, () => {
 
   beforeEach('Visit the website', () => {
     cy.visit('https://www.saucedemo.com');
   });
 
   const purchaseTest = (loginType, purchaseType) => {
     // Login with the user
     cy.login(loginType);
 
     // Add the products to the cart
     cy.addProductsToCart();
 
     // Perform the checkout
     cy.completeCheckout(purchaseType);
 
     // Validate that the checkout has been completed
     cy.validateCheckoutCompletion();
 
     // Perform the logout
     cy.performLogout();
     cy.wait(1000); // Ensure logout completes
   };
 
   it('Purchase with standard user', () => {
     purchaseTest("standard_user_login", "purchase_user_info");
   });
 
   it('Purchase with problem user', () => {
     purchaseTest("problem_user_login", "purchase_user_info");
   });
});