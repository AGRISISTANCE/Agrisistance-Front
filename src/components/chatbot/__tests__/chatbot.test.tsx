import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatBot from "../Chatbot";

// Mock the image imports
jest.mock(
  "../../../assets/img/icons/farmeremoji.png",
  () => "mocked-farmeremoji.png"
);

describe("ChatBot Component", () => {
  test("Chatbot opens and displays initial message", () => {
    render(<ChatBot />);

    // Ensure the chatbot toggle button is present
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();

    // Click the toggle button to open the chatbot
    fireEvent.click(toggleButton);

    // Check that the initial message is displayed
    expect(
      screen.getByText("Hello farmer, how can I help you today?")
    ).toBeInTheDocument();
  });

  test("User can send a message and receive a response", async () => {
    render(<ChatBot />);

    // Open the chatbot
    const toggleButton = screen.getByRole("button");
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

    // Wait for the chatbot's response to be displayed
    await waitFor(
      () =>
        expect(
          screen.getByText("Thank you for your message!")
        ).toBeInTheDocument(),
      { timeout: 2000 } // Increase timeout to 2000ms to allow time for setTimeout
    );
  });
});
