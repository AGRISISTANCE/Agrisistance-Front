import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatBot from "../Chatbot";
import { apiCall } from "../../../services/api";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../../redux/store"; // Adjust path as necessary

// Mock image imports
jest.mock(
  "../../../assets/img/icons/farmeremoji.png",
  () => "mocked-farmeremoji.png"
);
jest.mock(
  "../../../assets/img/icons/farmeremoji.png",
  () => "mocked-header-icon.png"
);

// Mock the apiCall function
jest.mock("../../../services/api", () => ({
  apiCall: jest.fn(),
}));

beforeEach(() => {
  (apiCall as jest.Mock).mockReset();
});

describe("ChatBot Component", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChatBot />
        </PersistGate>
      </Provider>
    );

    // Ensure that the chatbot toggle button is present
    const toggleButton = screen.getByRole("button", { name: /chat/i });
    expect(toggleButton).toBeInTheDocument();
  });

  test("Chatbot opens and displays initial message", () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChatBot />
        </PersistGate>
      </Provider>
    );

    // Ensure the chatbot toggle button is present
    const toggleButton = screen.getByRole("button", { name: /chat/i });
    fireEvent.click(toggleButton);

    // Check that the initial message is displayed
    expect(
      screen.getByText("Hello farmer, how can I help you today?")
    ).toBeInTheDocument();
  });

  test("User can send a message and receive a response", async () => {
    // Mock the API call to return a fixed response
    (apiCall as jest.Mock).mockResolvedValueOnce({
      result: "You can grow corn by planting seeds in fertile soil.",
    });

    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChatBot />
        </PersistGate>
      </Provider>
    );

    // Open the chatbot
    const toggleButton = screen.getByRole("button", { name: /chat/i });
    fireEvent.click(toggleButton);

    // Type a message in the input field
    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "How do I grow corn?" } });

    // Send the message
    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);

    // Check that the user's message is displayed
    expect(screen.getByText("How do I grow corn?")).toBeInTheDocument();

    // Check that the loading state is displayed
    expect(screen.getByText("...")).toBeInTheDocument();
  });
});
