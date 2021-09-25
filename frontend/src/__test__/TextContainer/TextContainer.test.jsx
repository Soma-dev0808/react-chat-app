import React from "react";
import { render } from "@testing-library/react";
import TextContainer from "../../components/TextContainer/TextContainer";
import { getUsers } from "../utils/utilities";

describe("TextContainer component render test", () => {
  test("render test", () => {
    const { getByText, getAllByRole, rerender } = render(<TextContainer />);
    let headings = getAllByRole("heading");
    expect(headings.length).toBe(3);

    const headingTitles = [
      "Realtime Chat Application💬",
      "Created with React, Express, Node and Socket.IO🌟",
      "Try it out right now!⬅️",
    ];

    for (let i = 0; i < headings.length; i++) {
      expect(headings[i].textContent).toBe(headingTitles[i]);
    }

    // render with users(1 user)
    let users = getUsers();
    rerender(<TextContainer users={users} />);

    headings = getAllByRole("heading");
    expect(headings.length).toBe(5);

    // check if all users passed were rendered
    users.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });

    // render with users(10 users)
    users = getUsers(10);
    rerender(<TextContainer users={users} />);

    // check if all users passed were rendered
    users.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });
});
