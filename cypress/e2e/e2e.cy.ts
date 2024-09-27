describe("Landing Page Footer Test", () => {
  it('Should scroll to the footer, click "Get Started", complete sign-up, and manually verify email', () => {
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
    cy.get('input[placeholder="First Name"]').type("Ryma");
    cy.get('input[placeholder="Last Name"]').type("Felkir");

    // Use a real email
    cy.get('input[placeholder="Email"]').type("mr_felkir@esi.dz");

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

    // Click the "Sign Up" button to submit the form
    cy.get("button").contains("Sign Up").click();

    // Wait for some time to simulate manual verification via email
    cy.log("Please check your email and verify your account manually.");
    cy.wait(60000); // Wait for 60 seconds for manual email verification

    // Now, simulate the user returning to the login page after verifying their email
    cy.visit("/auth/login");

    // Fill in the login form
    cy.get("input[type='email']").type("mr_felkir@esi.dz"); // Use your test email
    cy.get("input[type='password']").type("SecureP@ssw0rd"); // Use your test password

    cy.get("button").contains("Sign Up").click();

    // Click the 'Log In' button
    cy.get("button").contains("Log In").click();

    // Wait for the success message to appear
    cy.contains("Login successful! Redirecting...", { timeout: 60000 }).should(
      "be.visible"
    );

    // Verify that the URL includes "/dashboard/home"
    cy.url({ timeout: 60000 }).should(
      "include",
      "http://localhost:3000/dashboard/home"
    );

    // Optionally, verify the welcome message or some element on the dashboard
    cy.contains("Welcome back", { timeout: 60000 }).should("be.visible");
  });
});
