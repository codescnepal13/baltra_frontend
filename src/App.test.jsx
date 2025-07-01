import { describe, it, expect } from "vitest";
import { render, screen, userEvent } from "../utils/Test-utils";

import BaltraLogin from "./pages/user/login/BaltraLogin";
import { handlers } from "./__tests__/mocks/handlers";
import { server } from "./__tests__/mocks/servers";

// Set up the MSW server with handlers
server.use(...handlers);

describe("BaltraLogin", () => {
  it("should display success message on successful login", async () => {
    render(<BaltraLogin />);

    // Fill in the form
    userEvent.type(screen.getByLabelText(/Mobile Number/i), "1234567890");
    userEvent.type(screen.getByLabelText(/Password/i), "password123");

    // Submit the form
    userEvent.click(screen.getByText(/Sign In/i));

    // Check for expected outcome
    expect(await screen.findByText(/Todo List: 1/i)).toBeInTheDocument();
  });

  it("should display error message on login failure", async () => {
    // Override the handler to simulate a login failure
    server.use(
      rest.post(
        "http://192.168.1.93:8000/api/customer/login",
        (req, res, ctx) => {
          return res(ctx.status(401));
        }
      )
    );

    render(<BaltraLogin />);

    // Fill in the form
    userEvent.type(screen.getByLabelText(/Mobile Number/i), "9861315260");
    userEvent.type(screen.getByLabelText(/Password/i), "P@ssw0rd123");

    // Submit the form
    userEvent.click(screen.getByText(/Sign In/i));

    // Check for expected outcome
    expect(await screen.findByText(/Invalid Input!/i)).toBeInTheDocument();
  });
});
