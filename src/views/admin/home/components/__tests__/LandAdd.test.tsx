import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../../redux/store";
import LandAdd from "../LandAdd";
import { BrowserRouter } from "react-router-dom";

describe("LandAdd Component", () => {
  test('opens modal when "Add New Land" button is clicked', async () => {
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LandAdd />
        </BrowserRouter>
      </Provider>
    );

    const addButton = getByRole("button", { name: /Add New Land/i });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(getByText("What is your land name?")).toBeInTheDocument();
      expect(getByText("Land name")).toBeInTheDocument();
    });
  });
});
