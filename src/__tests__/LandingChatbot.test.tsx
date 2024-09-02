// src/__tests__/LandingChatbot.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Main from "../App";
import "@testing-library/jest-dom";

// Create a mock store
const mockStore = configureStore([]);
const store = mockStore({
  // Provide initial state for your Redux store here
  token: { token: null }, // Adjust based on your actual state
});

// Mock the play method for HTMLMediaElement
beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });
});

test("renders chatbot button on landing page and opens chatbot on click", async () => {
  // Render the Main component inside Router and Provider to handle routing and Redux state
  render(
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  );

  // Check if the chatbot button is present on the landing page
  const chatbotButton = screen.getByRole("button", { name: /Chat/i });
  expect(chatbotButton).toBeInTheDocument();

  // Optionally, check if the chatbot is initially hidden (if applicable)
  const chatbotBox = screen.queryByText(
    /Hello farmer, how can I help you today?/i
  );
  expect(chatbotBox).toBeNull(); // Ensure it's not in the document initially

  // Simulate a click on the chatbot button
  fireEvent.click(chatbotButton);

  // Wait for the chatbot box to appear and check if it is visible
  await waitFor(() => {
    const chatbotBox = screen.getByText(
      /Hello farmer, how can I help you today?/i
    );
    expect(chatbotBox).toBeInTheDocument();
  });
});
