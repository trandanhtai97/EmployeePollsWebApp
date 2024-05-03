import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { MemoryRouter } from "react-router";
import mockStore from "./MockStore";
import createTestStore from "./TestStore";
import Dashboard from "components/Dashboard";

let store;

beforeEach(() => {
  store = createTestStore(mockStore);
});

describe("When the dashboard is rendered", () => {
  it("should render the dashboard showing the unanswered polls by default", () => {
    const tree = (
      <MemoryRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter>
    );

    render(tree);

    const unansweredTab = screen.getByTestId("unansweredTab");
    const answeredTab = screen.getByTestId("answeredTab");

    expect(unansweredTab).toHaveClass("nav-bar-item", "nav-bar-item-active");
    expect(answeredTab).toHaveClass("nav-bar-item", "false");
  });

  it("should render the answered polls when the 'answered' tab is clicked", () => {
    const tree = (
      <MemoryRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter>
    );

    render(tree);

    const unansweredTab = screen.getByTestId("unansweredTab");
    const answeredTab = screen.getByTestId("answeredTab");

    fireEvent.click(answeredTab);

    expect(unansweredTab).toHaveClass("nav-bar-item", "false");
    expect(answeredTab).toHaveClass("nav-bar-item", "nav-bar-item-active");
  });
});
