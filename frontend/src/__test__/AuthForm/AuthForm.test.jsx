import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import createWrapper from "../utils/createWrapper";
import { en } from "../../utils/language";

afterEach(cleanup);

const { wrapper } = createWrapper();

describe("Auth Form test", () => {
  test("render test", async () => {
    const { container, rerender, findAllByRole } = render(
      <AuthForm isLogin={false} />,
      {
        wrapper,
      }
    );

    expect(container.firstChild).not.toBe(null);

    let inputFields = await findAllByRole("textbox");
    expect(inputFields.length).toBe(2);

    rerender(<AuthForm isLogin />, { wrapper });

    inputFields = await findAllByRole("textbox");
    expect(inputFields.length).toBe(1);
  });

  test("Form action test", async () => {
    const mockFormAction = jest.fn();
    const mockHandleInput = jest.fn();

    mockFormAction.mockImplementation((e) => {
      e.preventDefault();
    });

    mockHandleInput.mockImplementation((e) => {
      e.preventDefault();
    });

    const { rerender, getByRole, getByPlaceholderText } = render(
      <AuthForm
        isLogin={false}
        formAction={mockFormAction}
        handleInput={mockHandleInput}
      />,
      {
        wrapper,
      }
    );

    // input value
    const inputFields = getByPlaceholderText(en.USERNAME_PLACEHOLDER);
    fireEvent.change(inputFields, { target: { value: "23" } });
    expect(inputFields.value).toBe("23");

    // input value
    const inputFields2 = getByPlaceholderText(en.USERNAME_PLACEHOLDER);
    fireEvent.change(inputFields2, { target: { value: "235" } });
    expect(inputFields.value).toBe("235");

    fireEvent.click(getByRole("button"));

    expect(mockFormAction).toHaveBeenCalled();
  });
});
