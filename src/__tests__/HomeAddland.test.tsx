// src/__tests__/Home.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store"; // Adjust path if necessary
import Home from "../views/admin/home/index"; // Adjust path if necessary
import userEvent from "@testing-library/user-event";

// Mock necessary parts of the app (e.g., components, redux store)
jest.mock("../views/admin/home/components/AddNewLand", () => ({
  __esModule: true,
  default: () => (
    <div role="dialog" aria-labelledby="modal-title">
      <input placeholder="Enter land name" />
      <button>Next</button>
    </div>
  ),
}));

// Mock `apiCall` if necessary
jest.mock("../services/api", () => ({
  apiCall: jest.fn(() =>
    Promise.resolve({
      /* mock user profile data */
    })
  ),
}));

test("should render Home component and handle AddNewLand form steps", async () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  // Check if the Home component renders correctly
  expect(screen.getByText("Selected Land")).toBeInTheDocument();

  // Click the button to open the modal
  const addButton = screen.getByText("+ Add New Land");
  userEvent.click(addButton);

  // Wait for the modal to appear and check if it is visible
  await waitFor(() => {
    expect(screen.getByRole("dialog")).toBeVisible();
  });

  // Interact with the modal form
  userEvent.type(screen.getByPlaceholderText("Enter land name"), "My New Land");
  userEvent.click(screen.getByText("Next"));

  // You can add more steps here to simulate filling out the form
  // and checking the progress, such as verifying that form data is being updated
  // and submitted correctly.

  // Verify that the form submission or next step happens as expected
  // For example, if you expect a specific text or a change in the UI after form submission:
  // expect(screen.getByText('Some expected result')).toBeInTheDocument();
});
