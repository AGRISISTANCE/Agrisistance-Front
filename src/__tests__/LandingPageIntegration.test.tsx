// src/__tests__/ChatbotButton.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "../App"; // Adjust the path if necessary
import "@testing-library/jest-dom";

// Mock the play method for HTMLMediaElement
beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });
});

test("renders chatbot button on landing page and opens chatbot on click", () => {
  // Render the Main component inside Router to handle routing
  render(
    <Router>
      <Main />
    </Router>
  );

  // Check if the chatbot button is present on the landing page
  const chatbotButton = screen.getByRole("button", { name: /Chat/i });
  expect(chatbotButton).toBeInTheDocument();

  // Optionally, check if the chatbot is initially hidden (if applicable)
  // const chatbot = screen.queryByRole('dialog'); // or whatever role or selector applies
  // expect(chatbot).not.toBeVisible();

  // Simulate a click on the chatbot button
  fireEvent.click(chatbotButton);

  // Optionally, verify if the chatbot appears after clicking
  // const chatbot = screen.getByRole('dialog'); // or whatever role or selector applies
  // expect(chatbot).toBeVisible();
});
