import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Main from "../App"; // Ensure this is the correct path

// Create a mock store
const mockStore = configureStore([]);

beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });
});

test("renders chatbot button on Home page and opens chatbot on click", async () => {
  // Create an initial state for the store
  const initialState = {
    token: { token: "mockToken" }, // Adjust based on your actual state structure
  };

  // Create the store with the initial state
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Main />
      </MemoryRouter>
    </Provider>
  );

  // Ensure the chatbot button exists using aria-label
  const chatbotButton = await screen.findByRole("button", { name: /Chat/i });
  expect(chatbotButton).toBeInTheDocument();

  // Click the button to open the chatbot
  fireEvent.click(chatbotButton);

  // Verify the chatbot box is now open
  await waitFor(() => {
    const chatbotBox = screen.getByText(
      /Hello farmer, how can I help you today?/i
    );
    expect(chatbotBox).toBeInTheDocument();
  });
});
