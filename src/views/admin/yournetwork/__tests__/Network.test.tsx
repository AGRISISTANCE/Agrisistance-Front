// components/Network.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Network from "../index";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../../../../redux/store";

describe("Network Component", () => {
  it("renders all the tabs correctly", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Network />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText("All Posts")).toBeInTheDocument();
    expect(screen.getByText("Business Promotion")).toBeInTheDocument();
    expect(
      screen.getByText("Opportunities and Partnerships")
    ).toBeInTheDocument();
    expect(screen.getByText("Products and Resources")).toBeInTheDocument();
    expect(screen.getByText("My Posts")).toBeInTheDocument();
  });

  it("displays AllPosts component when All Posts tab is selected", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Network />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText("All Posts"));
    expect(screen.getByText("All Posts")).toBeInTheDocument();
  });

  it("displays MyPosts component when My Posts tab is selected", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Network />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText("My Posts"));
    expect(screen.getByText("+ Add New Post")).toBeInTheDocument();
  });
});
