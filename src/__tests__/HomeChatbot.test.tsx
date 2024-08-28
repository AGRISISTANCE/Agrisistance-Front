import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Main from "../App"; // Adjust the import path as necessary
beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });
});

test("renders chatbot button on Home page and opens chatbot on click", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Main />
    </MemoryRouter>
  );

  // Ensure the chatbot button exists using aria-label
  const chatbotButton = await screen.findByRole("button", { name: /Chat/i });
  expect(chatbotButton).toBeInTheDocument();

  // Click the button to open the chatbot
  fireEvent.click(chatbotButton);

  // Verify the chatbot box is now open
  // You may need to use a different query, such as className or role
  const chatbotBox = screen.getByText(
    /Hello farmer, how can I help you today?/i
  );
  expect(chatbotBox).toBeInTheDocument();
});
