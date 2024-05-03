import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import mockStore from "./MockStore";
import createTestStore from "./TestStore";
import Header from "actions/Header";

let store;
beforeEach(() => {
  store = createTestStore(mockStore);
});

describe("When navigation is shown", () => {
  it("clicking the home should route to '/'", () => {
    let tree = (
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    render(tree);
    const home = screen.getByTestId("home");

    expect(home).toHaveAttribute("href", "/");
  });
  it("clicking the leaderboard should route to 'leaderboard'", () => {
    let tree = (
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
    render(tree);
    const leaderboard = screen.getByTestId("leaderboard");

    expect(leaderboard).toHaveAttribute("href", "leaderboard");
  });
  it("clicking the new poll should route to 'new-poll'", () => {
    let tree = (
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
    render(tree);
    const newPoll = screen.getByTestId("newPoll");
    expect(newPoll).toHaveAttribute("href", "new-poll");
  });
});
