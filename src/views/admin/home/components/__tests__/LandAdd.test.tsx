import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../../../redux/rootReducer";
import LandAdd from "../LandAdd";
import { BrowserRouter } from "react-router-dom";

// Create a mock Redux store
const store = createStore(rootReducer);

describe("LandAdd Component", () => {
  test('opens modal when "Add New Land" button is clicked', async () => {
    // Render the component with Provider and BrowserRouter
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LandAdd />
        </BrowserRouter>
      </Provider>
    );

    // Use getByRole to find the button with accessible name "Add New Land"
    const addButton = getByRole("button", { name: /Add New Land/i });

    // Simulate button click
    fireEvent.click(addButton);

    // Use waitFor to handle asynchronous updates and check for modal content
    await waitFor(() => {
      // Check for specific text or element inside the modal
      expect(getByText("What is your land name?")).toBeInTheDocument();
      expect(getByText("Land name")).toBeInTheDocument();
    });
  });
});
