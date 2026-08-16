import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  it("renders email, password, and submit fields", () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i),
    ).toBeInTheDocument();
  });
  it("shows an email format error for an invalid address", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "notanemail");

    // Ensure RHF has registered the typed value before submitting
    expect(emailInput).toHaveValue("notanemail");

    await user.click(screen.getByRole("button", { name: /sign in/i }));
    expect(
      await screen.findByText(/enter a valid email/i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();
  });
});
