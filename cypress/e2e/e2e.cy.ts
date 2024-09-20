describe("Landing Page Footer Test", () => {
  it('Should scroll to the footer, click "Get Started", complete sign-up, and verify email', () => {
    cy.visit("http://localhost:3000/");

    // Scroll to the bottom of the page
    cy.scrollTo("bottom", { ensureScrollable: false });

    // Wait for the footer to be visible
    cy.get("footer").should("be.visible");

    // Find the "Get Started" button and click it
    cy.get("footer").contains("Get Started").should("be.visible").click();

    // Verify that the page redirected to the login page
    cy.url().should("include", "/auth/login");

    // On the login page, find the sign-up link and click it
    cy.contains("Sign Up").should("be.visible").click();

    // Verify redirection to the sign-up page
    cy.url().should("include", "/auth/signup");

    // Fill out the sign-up form
    cy.get('input[placeholder="First Name"]').type("John");
    cy.get('input[placeholder="Last Name"]').type("Doe");
    cy.get('input[placeholder="Email"]').type("john.doey@example.com");

    // Click to open the dropdown and select a country
    cy.get('button[aria-haspopup="menu"]').click();
    cy.get('div[role="menu"]')
      .should("be.visible")
      .within(() => {
        cy.contains("Algeria").click({ force: true });
      });

    // Verify that the selected country is displayed
    cy.get('button[aria-haspopup="menu"]').should("contain", "Algeria");
    cy.get("select").select("+213").should("have.value", "+213");

    // Fill out remaining fields
    cy.get('input[placeholder="Phone Number"]').type("1234567890");
    cy.get(
      'input[placeholder="Min 8 chars with numbers and special chars"]'
    ).type("SecureP@ssw0rd");

    // Intercept the signup API request
    cy.intercept("/auth/register").as("registerUser");

    cy.get("button").contains("Sign Up").click();

    // Wait for the signup request to complete and check the response status
    cy.wait("@registerUser", { timeout: 10000 }) // Correct alias here
      .its("response.statusCode")
      .should("eq", 200);

    // Intercept email verification
    cy.intercept("GET", "/auth/email-verified-successfully").as(
      "verifyRequest"
    );

    // Trigger the email verification (replace with dynamic token if available)
    cy.request("GET", "/auth/verify?token=test-verification-token");

    // Wait for the verification request to complete
    cy.wait("@verifyRequest", { timeout: 40000 }) // Correct alias here
      .its("response.statusCode")
      .should("eq", 200);

    // Verify the email verification success page
    cy.url().should("include", "/auth/email-verified-successfully");
    cy.contains("Your email has been verified successfully!").should(
      "be.visible"
    );

    // Redirect to login and log in
    cy.contains("Log In").click();

    // Fill out the login form
    cy.get("input[name='email']").type(Cypress.env("TEST_USER_EMAIL")); // Use env variable for email
    cy.get("input[name='password']").type(Cypress.env("TEST_USER_PASSWORD")); // Use env variable for password
    cy.contains("Submit").click(); // Assuming the "Submit" button is used for login

    // Verify login success
    cy.url().should("include", "/dashboard"); // Adjust based on actual redirection
    cy.contains(`Welcome back, ${Cypress.env("TEST_USER_NAME")}`).should(
      "be.visible"
    ); // Dynamic welcome message
  });
});
