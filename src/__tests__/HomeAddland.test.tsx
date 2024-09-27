import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for testing routes
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
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );

  // Debug the DOM to see what's being rendered
  screen.debug();

  // Use a flexible matcher to locate the button
  const addButton = await waitFor(() =>
    screen.getByText((content) => content.includes("Add New Land"))
  );

  // Click the button to open the modal
  userEvent.click(addButton);

  // Wait for the modal to appear and check if it is visible
  await waitFor(() => {
    expect(screen.getByRole("dialog")).toBeVisible();
  });

  // Interact with the modal form
  userEvent.type(screen.getByPlaceholderText("Enter land name"), "My New Land");
  userEvent.click(screen.getByText("Next"));
});
