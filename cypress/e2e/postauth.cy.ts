describe("Home Page and Add New Land E2E Test", () => {
  // Visit the home page before each test

  it("should open and close chatbot, then interact with Add Land form", () => {
    // Open the chatbot (assuming there's a button with a specific class or data-attribute)
    cy.visit("http://localhost:3000/dashboard/home");

    cy.get("[data-cy=chatbot-button]").click();

    // Close the chatbot (assuming there's a close button within the chatbot)
    cy.get("[data-cy=close-chatbot]").click();

    // Click on Add New Land button
    cy.contains("Add New Land").click();

    // Step 0: Land Name
    cy.get('input[placeholder="Enter land name"]').type("Test Land");
    cy.contains("Next").click();

    // Step 1: Coordinates
    cy.get('input[placeholder="Enter latitude"]').type("40.7128");
    cy.get('input[placeholder="Enter longitude"]').type("-74.0060");
    cy.contains("Next").click();

    // Step 2: Land Size
    cy.get('input[placeholder="Enter land size"]').type("100");
    cy.contains("Next").click();

    // Step 3: Budget
    cy.get('input[placeholder="Enter budget"]').type("10000");
    cy.contains("Next").click();

    // Step 4: Soil Details
    cy.get('input[placeholder="Enter oxygen level"]').type("21");
    cy.get('input[placeholder="Enter Nitrogen level"]').type("250");
    cy.get('input[placeholder="Enter potassium level"]').type("250");
    cy.get('input[placeholder="Enter phosphorus level"]').type("250");
    cy.get('input[placeholder="Enter ph Level"]').type("7");

    // Close the form without submitting (assuming there's a close button)
    cy.get("[data-cy=close-form]").click();

    // Verify that the form is closed (you might need to adjust this based on your UI behavior)
    cy.get("form").should("not.exist");
  });
});
